import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { requestNotif } from '../../redux/action';
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
                this.props.requestNotif(response.data.length)
                this.setState({
                    currentRequests: response.data,
                    numRequests: this.state.currentRequests.length
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

    handleAccept(betSelected, index) {
        axios.post('/requests/accept', { betID: betSelected.id })
            .then(response => {
                this.setState({
                    acceptStatus: response.data
                })
                alert(this.state.acceptStatus)
                let newArray = [...this.state.currentRequests];
                newArray.splice(index, 1)
                this.setState({
                    currentRequests: newArray
                })
            })
            .then(err => {
                console.log(err, 'error accepting request')
            })
    }

    handleDecline(betSelected, index) {
        axios.post('/requests/decline', { betID: betSelected.id })
            .then(response => {
                this.setState({
                    acceptStatus: response.data
                })
                alert(this.state.acceptStatus)
                let newArray = [...this.state.currentRequests];
                newArray.splice(index, 1)
                this.setState({
                    currentRequests: newArray
                })
            })
            .catch(err => {
                console.log(err, 'error declining request')
            })
    }

    render() {



        const currentRequestsList = this.state.currentRequests.map((request, i) => {
            return (
                <BetCard
                    key={i}
                    title={request.bet_title}
                    details={request.bet_details}
                    amount={request.amount}
                    date={new Date(request.bet_ends)}
                    index={i}
                    buttons={(
                        <div>
                            <button index={i} onClick={() => this.handleAccept(request, i)}>Accept</button>
                            <button index={i} onClick={() => this.handleDecline(request, i)} >Decline</button>
                        </div>
                    )} />
            )
        })

        return (
            <div className="view-container" id="requests-container">
                <h1>My Requests</h1>
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

export default connect(mapStateToProps, { requestNotif })(Requests);