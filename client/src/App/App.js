/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Activity from './pages/Activity';
import Upload from './pages/Upload';
import Header from './components/Header';

class App extends Component {
  render() {
    const App = () => (
      <div className="main-container">
        <Header />
        <main>
          <div className="header-margin" />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/characters" component={Characters} />
            <Route path="/activity" component={Activity} />
            <Route path="/upload" component={Upload} />
          </Switch>
          <footer>
            <p>
              WowClassicPopulation uses names and images from World of Warcraft, and data
              proprietary to Blizzard Entertainment, Inc. World of Warcraft, Warcraft and Blizzard
              Entertainment are trademarks or registered trademarks of Blizzard Entertainment, Inc.
              in the U.S. and/or other countries.
            </p>
          </footer>
        </main>
      </div>
    );
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
