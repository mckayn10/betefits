import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
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
                <div key={i} className="bet-card">
                    <div className="bet-title">Title: {request.bet_title} </div>
                    <div>Details: {request.bet_details} </div>
                    <div>Amount: {request.amount} </div>
                    <div>Sent By: {request.creator_username} </div>
                    <div>
                        <button index={i} onClick={() => this.handleAccept(request)}>Accept</button>
                        <button index={i} onClick={() => this.handleDecline(request)} >Decline</button>
                    </div>

                </div>
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