import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import { sessionUser, updatePicture, requestNotif } from '../../redux/action';
import TabContent from '../Tabs/TabContent'



class Login extends Component {

    // state = {
    //     username: '',
    //     usernameRegister: '',
    //     password: '',
    //     passwordRegister: '',
    //     email: ''
    // }



    // handleChange = (key, value) => {
    //     this.setState({
    //         [key]: value
    //     })
    // }

    // handleLogin = async () => {
    //     await axios.post('/login', this.state)
    //         .then(response => {
    //             console.log(response.data)
    //             this.props.sessionUser(response.data)
    //             this.props.history.push(`/dashboard/${this.props.user.username}`)
    //             this.props.updatePicture(this.props.user.picture)

    //         })
    //         .catch(err => {
    //             console.log(alert('username or password not found'))
    //         })
    //     axios.get(`/notifications/${this.props.user.id}`)
    //         .then(response => {
    //             this.props.requestNotif(response.data.count)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    // handleRegister = () => {
    //     axios.post('/register', this.state)
    //         .then(response => {
    //             this.props.sessionUser(response.data)
    //             this.props.history.push(`/dashboard/${this.props.user.username}`)
    //             this.props.updatePicture(this.props.user.picture)
    //         })
    // }



    render() {

        return (

            <TabContent />
            // <div className="login-container">

            //     <div className="inputs">
            //         <input name="username" placeholder="username" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
            //         <input type="password" name="password" placeholder="password" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
            //         <button onClick={this.handleLogin} >Login</button>
            //         <input name="usernameRegister" placeholder="username" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
            //         <input type="password" name="passwordRegister" placeholder="password" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
            //         <input name="email" placeholder="email address" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
            //         <button onClick={this.handleRegister} >Register</button>
            //     </div>
            //     <div>

            //     </div>
            // </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { sessionUser, updatePicture, requestNotif })(Login);