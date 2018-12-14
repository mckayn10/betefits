import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
import Profile from './components/Profile/Profile';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Card from './components/Nav/NavNew';


class App extends Component {
  render() {
    return (
      <div className="App-container">
        <div className="mobile-container">
          <div className="mobile-menu">
            <Card />
          </div>
        </div>
        <Profile />
        <Routes />

      </div>
    );
  }
}

export default App;
