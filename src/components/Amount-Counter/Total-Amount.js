import React, { Component } from 'react';
import { connect } from 'react-redux';
import './total-amount.css'
import axios from 'axios';

class TotalAmount extends Component {

    state = {
        totalEarnings: this.props.user.amount_made - this.props.user.amount_lost
    }


    render() {

        console.log(this.props.user)

        return (
            <div className="amount-container">
                <h2>Earnings:</h2>
                <div style={{
                    color: this.state.totalEarnings === 0 ? 'black' : ( this.state.totalEarnings > 0 ? 'green' : 'red')
                }} >${this.state.totalEarnings}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(TotalAmount);