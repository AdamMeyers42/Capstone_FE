import React, { Component } from 'react';
import 'react-router-dom';
import './Login.css';
import { Link } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",

        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const login = {
            username: this.state.username,
            password: this.state.password,
        };
        this.props.loginUser(login);
        this.setState({
            username: "",
            password: "",
        });
        
    }

    render() {
        return (
          
<div className="container">

<form onSubmit={this.handleSubmit} className="form-signin">
          <div className="row">
            <div className="col">
                <div>
                <h1 className="fs-1 fw-bold mb-5 text-uppercase">Login</h1>
                </div>
                  <p className="fs-5 text-white-50 mb-4">Please enter your username and password!</p>

                  <div className="form-outline form-white mb-4">
                    <input type="text" name= "username" id="typeUsernameX" class="form-control form-control-lg" onChange={this.handleChange} value={this.state.username}  />
                    <label className="form-label fs-5 fw-bold" for="typeUsernameX">Username</label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="password" name= "password" id="typePasswordX" class="form-control form-control-lg" onChange={this.handleChange} value={this.state.password} />
                    <label className="form-label fs-5 fw-bold" for="typePasswordX">Password</label>
                  </div>
                  <div>
                  <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                  </div>
                  <div>
                  <Link to ='/Register'>
                 <button class="btn btn-outline-light btn-lg px-5 fw-">Register</button>
                 </Link>
                  </div>
            </div>
            
          </div>
          
</form>

</div>


     )
    }
}

export default Login
