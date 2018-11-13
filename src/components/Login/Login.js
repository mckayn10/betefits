import React, {Component} from 'react';
import axios from 'axios';
import './login.css';
import {connect} from 'react-redux';
import user from '../../redux/action';


class Login extends Component{
    
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
        axios.post('http://localhost:8080/login', this.state)
            .then(response => {
                console.log(response.data.username)
                
                this.props.user(response.data.username, response.data.id)
                this.props.history.push(`/dashboard/${response.data.username}`)
            })
    }



    render(){

        return(
            <div className="login-container">
                <div className="inputs">
                    <input name="username" placeholder="username" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <input name="password" placeholder="password" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <button onClick={this.handleLogin} >Login</button>
                    <input name="usernameRegister" placeholder="username" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <input name="passwordRegister" placeholder="password" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <input name="email" placeholder="email address" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <button>Register</button>
                </div>
                <div>
                    
                </div>
            </div>
        )
    }
}

export default connect(null, {user})(Login);