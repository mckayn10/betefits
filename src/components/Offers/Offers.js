import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import BetCard from '../Bet-Card/Bet-Card';
import '../Bet-Card/bet-card.css';

class Offers extends Component {

    state = {
        currentOffers: []
    }

    componentDidMount = () => {
        this.callUserInfo()
    }

    callUserInfo = () => {
        axios.get(`/offers/${this.props.user.id}`)
            .then(response => {
                console.log(response)
                this.setState({
                    currentOffers: response.data
                })
            })
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.user.id !== prevProps.user.id) {
            this.callUserInfo()
        }
    }

    handleRemove = (index, id) => {
        axios.post('/requests/decline', { betID: id })
            .then(response => {
                console.log(response)
                let newArray = [...this.state.currentOffers];
                newArray.splice(index, 1)
                this.setState({
                    currentOffers: newArray
                })
                
            })
    }

    render() {
        console.log(this.state.currentOffers)

        const currentOffersList = this.state.currentOffers.map((offer, i) => {
            return (
                <BetCard key={i} title={offer.bet_title} details={offer.bet_details} amount={offer.amount} date={offer.end_date} deleteButton={(
                    <button className="remove-button" onClick={() => this.handleRemove(i, offer.id)} >Remove Offer</button>
                )} />
            )
        })

        return (
            <div className="view-container">
                <div>Offers</div>
                {currentOffersList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Offers);