import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
import {Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';


class App extends Component {
  render() {
    return (
      <div className="App-container">
        <Route component={Nav} />
        <Routes />

      </div>
    );
  }
}

export default App;
