import React from 'react';
import {Link} from 'react-router-dom';
import './nav.css';
import {connect} from 'react-redux';


function Nav (props){
    if(props.location.pathname === '/'){
        return null
    }else {

    return(
        
        <div className="nav-container">
            <div className="menu-container">
                <div className="user-info">
                    <div>{props.username}</div>
                    <div>{props.id}</div>
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

const mapStateToProps = (state) => {
    return {
        username: state.username,
        id: state.id
    }
}

export default connect(mapStateToProps)(Nav);