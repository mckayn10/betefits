import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import BetCard from '../../Bet-Card/Bet-Card';
import '../../Bet-Card/bet-card.css';
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
                <BetCard key={i} title={bet.bet_title} details={bet.bet_details} amount={bet.amount} date={bet.end_date} creator={bet.creator_username} acceptor={bet.sent_to_username} />
            )
        })


        return (
            <div className="bets-container">
                <div className="current-container">
                    <h1>Current Bets</h1>
                    {currentBetsList}
                </div>
                <div className="past-container">
                    <h1>Past Bets</h1>
                </div>
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