import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import BetCard from '../../Bet-Card/Bet-Card';
import '../../Bet-Card/bet-card.css';
import './current-bets.css';
import Modal from '../../Modal/Modal';
import { updateBet } from '../../../redux/action';

class CurrentBets extends Component {

    state = {
        currentBets: [],
        pastDate: true,
        toggleModal: false,
        toggleConfirm: false,
        confirmName: {}
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

    handleToggleClick = async (bet) => {
        await this.props.updateBet(bet)
        this.setState({
            toggleModal: !this.state.toggleModal,
            toggleConfirm: false
        })
        console.log(this.props)
    }

    handleToggleConfirm = (user) => {
        this.setState({
            confirmName: user
        })
        if (this.state.toggleConfirm) {
            return null
        } else {
            this.setState({
                toggleConfirm: !this.state.toggleConfirm,
            })
        }

    }

    handleConfirmClick = (winner, loserID) => {
        console.log(loserID)

        axios.post(`/winner/${winner.id}`, { bet: this.props.currentBet })
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log('error updating winning user', err)
            })
        axios.post(`/loser/${loserID}`, { bet: this.props.currentBet })
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log('error updating losing user', err)
            })
        axios.post(`/resolve-bet`, { bet: this.props.currentBet })
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log('error resolving', err)
            })
        this.setState({
            toggleModal: false
        })
    }

    render() {

        const currentBetsList = this.state.currentBets.map((bet, i) => {

            return (

                <BetCard
                    key={i}
                    title={bet.bet_title}
                    details={bet.bet_details}
                    amount={bet.amount}
                    creator={bet.creator_username}
                    acceptor={bet.sent_to_username}
                    resolveButton={this.state.pastDate}
                    date={new Date(bet.bet_ends)}
                    currentDate={new Date(bet.bet_ends)}
                    toggle={() => this.handleToggleClick(bet)}

                />
            )
        })

        const { creator_id, creator_username, sent_to, sent_to_username } = this.props.currentBet


        return (
            <div className="bets-container">
                {this.state.toggleModal ? (
                    <Modal
                        changeConfirmState={this.handleToggleConfirm}
                        toggleConfirm={this.state.toggleConfirm}
                        changeToggle={this.handleToggleClick}
                        confirmName={this.state.confirmName}
                        confirmClick={this.handleConfirmClick}
                        current={true}

                    />
                ) : null}
                <h1>Current Bets</h1>
                <div className="current-container">
                    {currentBetsList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        currentBet: state.currentBet
    }
}

export default connect(mapStateToProps, { updateBet })(CurrentBets);