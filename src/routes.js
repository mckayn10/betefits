import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import CreateBet from './components/Create-Bet/Create-Bet';
import Dashboard from './components/Dashboard/Dashboard';
import Offers from './components/Offers/Offers';
import Requests from './components/Requests/Requests';


export default function Routes (){
    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/create-bet' component={CreateBet} />
            <Route path='/my-offers' component={Offers} />
            <Route path='/my-requests' component={Requests} />
        </Switch>
        )
}