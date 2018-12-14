import React, { Component } from 'react';
import TabList from './TabList';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { sessionUser, updatePicture, requestNotif } from '../../redux/action';



class TabContent extends Component {


    state = {
        username: '',
        usernameRegister: '',
        password: '',
        passwordRegister: '',
        email: ''
    }



    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    handleLogin = async () => {
        await axios.post('/login', this.state)
            .then(response => {
                this.props.sessionUser(response.data)
                this.props.history.push(`/dashboard/${this.props.user.username}`)
                this.props.updatePicture(this.props.user.picture)

            })
            .catch(err => {
                console.log(alert('username or password not found'))
            })
        axios.get(`/notifications/${this.props.user.id}`)
            .then(response => {
                this.props.requestNotif(response.data.count)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleRegister = async () => {
        await axios.post('/register', this.state)
            .then(response => {
                console.log(response.data)
                this.props.sessionUser(response.data)
            })
        console.log(this.props.user)
        this.props.history.push(`/dashboard/${this.props.user.username}`)
        this.props.updatePicture(this.props.user.picture)
    }

    render() {
        return (
            <div className="container up">
                <TabList>
                    <div label="Login" className="tab-content">
                        <div className="login-container">
                            <h1 id="login-title">Friends With Betefits</h1>
                            <div className="inputs">
                                <input name="username" placeholder="username" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                                <input type="password" name="password" placeholder="password" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                                <button onClick={this.handleLogin} >Login</button>

                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div label="Register" className="tab-content">
                        <div className="login-container">
                            <h1 id="login-title">Friends With Betefits</h1>
                            <div className="inputs">
                                <input name="usernameRegister" placeholder="username" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                                <input type="password" name="passwordRegister" placeholder="password" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                                <input name="email" placeholder="email address" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                                <button onClick={this.handleRegister} >Register</button>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </TabList>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { sessionUser, updatePicture, requestNotif })(withRouter(TabContent));