import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import BetCard from '../Bet-Card/Bet-Card';
import './requests.css'

class Requests extends Component {

    state = {
        currentRequests: [],
        acceptStatus: ''
    }

    componentDidMount = () => {
        this.callUserRequests()
    }

    callUserRequests = () => {
        axios.get(`/requests/${this.props.user.id}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    currentRequests: response.data
                })
            })
            .catch(err => {
                console.log(err, 'error getting requests')
            })
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.user.id !== prevProps.user.id) {
            this.callUserRequests()
        }
    }

    handleAccept (betSelected){
        axios.post('/requests/accept', {betID: betSelected.id})
            .then(response => {
                this.setState({
                    acceptStatus: response.data
                })
                alert(this.state.acceptStatus)
            })
            .then(err => {
                console.log(err, 'error accepting request')
            })
    }

    handleDecline (betSelected) {
        axios.post('/requests/decline', {betID: betSelected.id})
            .then(response => {
                this.setState({
                    acceptStatus: response.data
                })
                alert(this.state.acceptStatus)
            })
            .catch(err => {
                console.log(err, 'error declining request')
            })
    }

    render() {

        console.log(this.state.currentRequests)

        const currentRequestsList = this.state.currentRequests.map((request, i) => {
            return (
                <BetCard key={i} title={request.bet_title} details={request.bet_details} amount={request.amount} date={request.end_date} index={i} buttons={(
                    <div>
                        <button index={i} onClick={() => this.handleAccept(request)}>Accept</button>
                        <button index={i} onClick={() => this.handleDecline(request)} >Decline</button>
                    </div>
                )} />
            )
        })

        return (
            <div className="view-container">
                <div>My Requests</div>
                {currentRequestsList}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Requests);