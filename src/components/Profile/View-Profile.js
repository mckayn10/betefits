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
        console.log(this.props.profileUser)
        axios.get(`/current-bets/${this.props.profileUser.id}`)
            .then(response => {
                this.setState({
                    currentBets: response.data
                })
            })
        axios.get(`/offers/${this.props.profileUser.id}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    currentOffers: response.data
                })
            })
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.profileUser.id !== prevProps.profileUser.id) {
            this.callUserInfo()
        }
    }

    handleAcceptOffer = (offer) => {
        console.log(this.props.user)
        axios.post('/offers/accept', {offerID: offer.id, acceptor: this.props.user, })
            .then(response => {
                console.log(response.data)
            })

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
                    <button index={i} onClick={() => this.handleAcceptOffer(offer)}>Accept this offer!</button>
                </div>
            )
        })

        return (
            <div>
                {this.props.profileUser.username}
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
        user: state.user,
        selectedUser: state.selectedUser,
        profileUser: state.profileUser
    }
}

export default connect(mapStateToProps)(ViewProfile);