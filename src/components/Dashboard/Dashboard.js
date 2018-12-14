import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './dashboard.css';
import CurrentBets from './Current-Bets/CurrentBets';
import TotalAmount from '../Amount-Counter/Total-Amount';



class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard-container">
                <CurrentBets />
                <TotalAmount />
                <div className="other">Other container</div>
            </div>
        )
    }
}

export default withRouter(Dashboard);