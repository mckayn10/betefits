import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

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

    render(){
        console.log(this.state.currentOffers)

        const currentOffersList = this.state.currentOffers.map((offer, i) => {
            return (
                <div key={i} className="bet-card" >
                    <div className="bet-title">The Bet: {offer.bet_title} </div>
                    <div>Details: {offer.bet_details} </div>
                    <div>Amount: {offer.amount} </div>
                </div>
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