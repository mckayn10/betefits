import React, { Component } from 'react';
import axios from 'axios';
import './login.css';
import { connect } from 'react-redux';
import { sessionUser } from '../../redux/action';



class Login extends Component {

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

    handleLogin = () => {
        axios.post('/login', this.state)
            .then(response => {
                console.log(response.data)
                this.props.sessionUser(response.data)
                this.props.history.push(`/dashboard/${this.props.user.username}`)
            })
    }

    handleRegister = () => {
        axios.post('/register', this.state)
            .then(response => {
                this.props.sessionUser(response.data)
                this.props.history.push(`/dashboard/${this.props.user.username}`)
            })
    }



    render() {

        return (
            <div className="login-container">
                <div className="inputs">
                    <input name="username" placeholder="username" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <input type="password" name="password" placeholder="password" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <button onClick={this.handleLogin} >Login</button>
                    <input name="usernameRegister" placeholder="username" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <input type="password" name="passwordRegister" placeholder="password" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <input name="email" placeholder="email address" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <button onClick={this.handleRegister} >Register</button>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { sessionUser })(Login);