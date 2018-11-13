import React from 'react';
import {Link} from 'react-router-dom';
import './nav.css';


function Nav (props){
    if(props.location.pathname === '/'){
        return null
    }else {

    return(
        
        <div className="nav-container">
            <div className="menu-container">
                <div className="user-info">
                    <div>PICTURE</div>
                    <div>USERNAME</div>
                </div>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/my-offers'>My Offers</Link>
                <Link to='/my-requests'>My Requests</Link>
                <Link to='/create-bet'>Create New Bet</Link>
            </div>
            <div className="logout-button">
                <Link to='/'>Logout</Link>
            </div>
        </div>
    )
    }
}

export default Nav;