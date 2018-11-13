 import React, {Component} from 'react';
 import {withRouter} from 'react-router-dom';
 import './dashboard.css';

 class Dashboard extends Component {
     render(){
         return (
             <div className="view-container">
                 <div>Dashboard</div>
                 <div>Dashboard</div>
                 <div>Dashboard</div>
                 <div>Dashboard</div>
                 <div>Dashboard</div>
                 <div>Dashboard</div>
             </div>
         )
     }
 }

 export default withRouter(Dashboard);