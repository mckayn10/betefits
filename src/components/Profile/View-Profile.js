import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './profile.css';

class ViewProfile extends Component {

    state = {
        currentBets: [],
        currentOffers: [],
        totalAmountWon: 0

    }

    componentDidMount = () => {
        this.callUserInfo()
    }

    callUserInfo = () => {
        axios.get(`/current-bets/${this.props.selectedUser.id}`)
            .then(response => {
                console.log(response)
                this.setState({
                    currentBets: response.data
                })
            })
        axios.get(`/offers/${this.props.selectedUser.id}`)
            .then(response => {
                console.log(response)
                this.setState({
                    currentOffers: response.data
                })
            })
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.selectedUser.id !== prevProps.selectedUser.id) {
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
                    <div>Bet Created by {bet.creator_username} and Accepted by {bet.sent_to_username} </div>
                </div>
            )
        })

        const currentOffersList = this.state.currentOffers.map((offer, i) => {
            return (
                <div key={i} className="bet-card" >
                    <div className="bet-title">The Bet: {offer.bet_title} </div>
                    <div>Details: {offer.bet_details} </div>
                    <div>Amount: {offer.amount} </div>
                    <button>Accept this offer!</button>
                </div>
            )
        })

        return (
            <div>
                {this.props.selectedUser.username}
                <div className="profile-container">
                    <div> {currentBetsList} </div>
                    <div> {currentOffersList} </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedUser: state.selectedUser
    }
}

export default connect(mapStateToProps)(ViewProfile);