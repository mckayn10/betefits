import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './current-bets.css';

class CurrentBets extends Component {

    state = {
        currentBets: []
    }

    componentDidMount = () => {
        this.callUserInfo()
    }

    callUserInfo = () => {
        axios.get(`/current-bets/${this.props.user.id}`)
            .then(response => {
                this.setState({
                    currentBets: response.data
                })
            })
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.user.id !== prevProps.user.id) {
            this.callUserInfo()
        }
    }

    render() {

        const currentBetsList = this.state.currentBets.map((bet, i) => {
            return (
                <div key={i} className="bet-card" >
                    <div className="bet-title">The Bet: {bet.bet_title} </div>
                    <div>Details: {bet.bet_details} </div>
                    <div>Amount: {bet.amount} </div>
                    <div>Bet Created by: {bet.creator_username} and Accepted by: {bet.sent_to_username} </div>
                </div>
            )
        })


        return (
            <div className="current-container">
                <div>Current Bets</div>
                {currentBetsList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(CurrentBets);