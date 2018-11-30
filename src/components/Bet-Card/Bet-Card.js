import React from 'react';

export default function BetCard(props) {
    return (
        <div className="bet-card-container" >
            <div className="bet-title">{props.title} </div>
            <div className="bet-column">
                <div className="bet-column1">
                    <div className="bet-details"><b>Details:</b> {props.details} </div>
                    {props.creator ? (
                        <div>Bet Created by <b>{props.creator}</b> and Accepted by <b>{props.acceptor}</b> </div>
                    ) : null}
                    {props.buttons}
                    {props.deleteButton}
                </div>
                <div className="bet-column2">
                    <div className="bet-amount"><b>${props.amount}</b> </div>
                    <div><b>Ends On:</b> {props.date} </div>
                </div>
            </div>
        </div>
    )
}