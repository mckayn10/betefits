import React from 'react';


export default function SearchedUserCard (props){

            return (
                <div >

                    <h3> {props.username} </h3>
                    <h5>ID: {props.id} </h5>
                    <div className="profile-pic"></div>
                    {props.sendRequestButton}
                </div>
            )
    }
