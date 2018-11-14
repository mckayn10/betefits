 import React, {Component} from 'react';
 import {withRouter} from 'react-router-dom';
 import './dashboard.css';
 import CurrentBets from './Current-Bets/CurrentBets';
 import axios from 'axios';


 class Dashboard extends Component {

    componentDidMount = () => {
        axios.get('/user-info')
            .then(response => {
                console.log(response)
            })
    }

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