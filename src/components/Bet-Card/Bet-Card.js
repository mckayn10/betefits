import React from 'react';

function BetCard(props) {


    return (
        <div className="bet-card-container" >
            <div className="bet-title">{props.title} </div>
            <div className="bet-column">
                <div className="bet-column1">
                    <div className="bet-details"><b>{props.creator} wins if:</b> {props.details} </div>
                    {props.acceptor ? (
                        <div>
                            <div>Created by <b>{props.creator}</b> </div>
                            <div>Accepted by <b>{props.acceptor}</b> </div>
                        </div>
                    ) : null}
                    {props.buttons}
                    {props.deleteButton}
                    {props.currentDate < new Date() ? (
                        <div>
                            <button onClick={props.toggle}>Who Won?</button>
                        </div>
                    ) : null}
                    {props.offerDate < new Date() ? (
                        props.remove()
                    ) : null}
                </div>
                <div className="bet-column2">
                    <div className="bet-amount"><b>${props.amount}</b> </div>
                    <div><b>Ends On:</b> {props.date.toDateString()} </div>
                </div>
            </div>
        </div>
    )
}


export default BetCard