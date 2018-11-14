 import React, {Component} from 'react';
 import {withRouter} from 'react-router-dom';
 import './dashboard.css';
 import CurrentBets from './Current-Bets/CurrentBets';

 class Dashboard extends Component {
     render(){
         return (
             <div className="view-container">
                 <div>Dashboard</div>
                 <CurrentBets />
             </div>
         )
     }
 }

 export default withRouter(Dashboard);