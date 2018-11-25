import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Nav from '../Nav/Nav';

class Profile extends Component {
    render(){
        return(
            
            <Route component={Nav} />
        )
    }
}

export default Profile