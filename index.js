const express = require('express');
const path = require('path');
const formidableMiddleware = require('express-formidable');

const mongoose = require('mongoose');
const cachegoose = require('cachegoose');
const apiRouter = require('./routes/api');

const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';
Sentry.init({
  dsn: "https://638ec02adfc643489d9a64f60817a6b0@o1387008.ingest.sentry.io/6707868",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

mongoose.connect("mongodb://localhost:27017/census", { useNewUrlParser: true, poolSize: 20 });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

const app = express();

cachegoose(mongoose);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(formidableMiddleware());

app.use('/api', apiRouter);

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3'];
  res.json(list);
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

// Error Handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // console.log(err);

  const errCode = err.status || 500;
  const errMessage = err.message || 'Internal Server Error';

  res.json({ error: errMessage });
  Sentry.captureException(err)
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on port ${port}`);
