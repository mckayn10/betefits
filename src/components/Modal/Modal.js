import React, { Component } from 'react';
import { connect } from 'react-redux';
import './modal.css';

class Modal extends Component {

    state = {
        confirmName: ''
    }


    render() {

        const { creator_id, creator_username, sent_to, sent_to_username } = this.props.currentBet

        const loserID = this.props.confirmName.username === creator_username ? sent_to : creator_id;


        return (
            <div className="modal-container">
                <div className="modal-box">
                    <div id="select-title">
                        {this.props.current ? (
                            <h1>SELECT A WINNER</h1>
                        ) : (
                                <h1>COUNTER OFFER</h1>
                            )}
                    </div>
                    <div id="decide-container">
                        {this.props.current ? (
                            <div className="decide-container">
                                <h2 id="winner" onClick={() => this.props.changeConfirmState({ username: creator_username, id: creator_id })} >{creator_username}</h2>
                                <h2 id="winner" onClick={() => this.props.changeConfirmState({ username: sent_to_username, id: sent_to })} >{sent_to_username}</h2>
                            </div>

                        ) : (
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column"

                                }}>
                                    <input placeholder="new amount" name="newAmount" onChange={(e) => this.props.updateState(e.target.name, e.target.value)} />
                                    <textarea placeholder="new bet" name="newBet" onChange={(e) => this.props.updateState(e.target.name, e.target.value)} />
                                    <button style={{
                                        marginTop: "15px"
                                    }}>Send Counter Offer</button>
                                </div>
                            )}

                        {this.props.toggleConfirm ? (
                            <div className="confirm-container">
                                <span>Did <b>{this.props.confirmName.username}</b>  really win?</span>
                                <span><button onClick={() => this.props.confirmClick(this.props.confirmName, loserID)} >Yes</button></span>
                            </div>
                        ) : null}
                    </div>
                    <button onClick={this.props.changeToggle} >CLOSE</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentBet: state.currentBet
    }
}

export default connect(mapStateToProps)(Modal);