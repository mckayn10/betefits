import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class CurrentBets extends Component {

    state = {
        currentBetsList: []
    }

    componentDidMount = () => {
        axios.get(`http://localhost:8080/current-bets/${this.props.id}`)
            .then(response => {
                this.setState({
                    currentBetsList: response.data
                })
            })
    }

    render(){
        
        const currentBetsList = this.state.currentBetsList.map((bet, i) => {
            return (
                <div key = {i}>
                    <div>The Bet: {bet.bet_title} </div>
                    <div>Details: {bet.bet_details} </div>
                    <div>Amount: {bet.amount} </div>
                </div>
            )
        })


        return(
            <div>
                <div>Current Bets</div>
                {currentBetsList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.id,
        username: state.username
    }
}

export default connect(mapStateToProps)(CurrentBets);