import React from 'react';


export default function SearchedUserCard(props) {

    return (
        <div className="search-card-container">
            <div className="info-container">
                <div className="circular-image">
                    <img src={`${props.picture}`} />
                    {/* <div className="profile-pic" style={{
                        backgroundImage: `url(${props.picture})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}></div> */}
                </div>
                <div className="search-info">
                    <h3> {props.username} </h3>
                    <h5>ID: {props.id} </h5>
                </div>
            </div>
            <div className="search-card-buttons">
                <div>{props.sendRequestButton}</div>
                <div>{props.viewProfile}</div>
            </div>
        </div>
    )
}

