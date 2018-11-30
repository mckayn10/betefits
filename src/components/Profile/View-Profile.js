import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import BetCard from '../Bet-Card/Bet-Card';
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
                <BetCard key={i} title={bet.bet_title} details={bet.bet_details} amount={bet.amount} date={bet.end_date} creator={bet.creator_username} acceptor={bet.sent_to_username} />
            )
        })

        const currentOffersList = this.state.currentOffers.map((offer, i) => {
            return (
                <BetCard key={i} title={offer.bet_title} details={offer.bet_details} amount={offer.amount} date={offer.end_date} deleteButton={(
                    <button className="remove-button" onClick={() => this.handleRemove(i, offer.id)} >Remove Offer</button>
                )} />
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