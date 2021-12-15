import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from './Login/Login';
import Register from './Register/Register';
import NavigationBar from './NavigationBar/NavigationBar';
import CommentBoard from './CommentBoard/CommentBoard';  
import Home from './HomeScreen/Home';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Team from './Team/Team';
import Injury from './Injury/Injury'
import Profile from './Profile/Profile'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: null,
            comments: [],
            injuries: [],
            refresh: "",
            jwt: "",
        };
    }
    
    componentDidMount() {
        
        const jwt = localStorage.getItem('token');
        let user = ""
        try {
            user = jwtDecode(jwt);
            this.setState({loggedInUser: user });

        } catch (error) {
            console.log(error);
        }

        this.getAllInjury()
        this.getAllComments()
    }

    //login 
    registerNewUser = async (user) => {

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', user);
            console.log(response)
            this.loggedInUser = ({'username': user.username, 'password': user.password})

        }
        catch(error) {
            console.log(error, 'Invalid input');
        }
    }

    loginUser = async (login) => {

        try {
            let response = await axios.post('http://127.0.0.1:8000/api/auth/login/', login);
            this.setState({
                user: response.data.access
            });
            this.setState({
                jwt: response.data.access
            });
            this.setState({
                refresh: response.data.refresh
            });
            localStorage.setItem('token', response.data.access);
            
            window.location = ('/Profile')

        } catch (error) {
            alert('Invalid username or password')
        }
  
    }

    //comments
    getAllComments = async () => {
        let response = await axios.get('http://127.0.0.1:8000/comment/');
        this.setState({
            comments: response.data
        });
    }

    addNewComment = async (comment) => {

        try{
            const response = await axios.post('http://127.0.0.1:8000/commentauth/', comment, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
        }
        catch(error) {
            console.log(error, 'Invalid input');
        }
    }
 
    deleteComment = async (commentId) => {

        try{
            const response = await axios.delete('http://127.0.0.1:8000/commentauth/' + commentId, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
        }
        catch(error) {
            console.log(error, 'Invalid input');
        }
    }

    editComment = async (commentId) => {

        try{
            const response = await axios.put('http://127.0.0.1:8000/commentauth/' + commentId, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
        }
        catch(error) {
            console.log(error, 'Invalid input');
        }
    }

    //players

    

    
    //injuryreport
    getAllInjury = async () => {
        let response = await axios.get('http://127.0.0.1:8000/injury/');
        this.setState({
            injuries: response.data
        });
    }

    deleteInjury = async (injuryReportId) => {

        try{
            const response = await axios.delete('http://127.0.0.1:8000/injury/' + injuryReportId, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
        }
        catch(error) {
            console.log(error, 'Invalid input');
        }
    }

    editInjury = async (injuryReport,injuryReportId) => {
        console.log("B2")
        try{
            const response = await axios.put('http://127.0.0.1:8000/injury/' + injuryReportId, injuryReport, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
        }
        catch(error) {
            console.log(error, 'Invalid input');
        }
        console.log("E2")
    }

    addNewInjury = async (injury) => {

        try{
            const response = await axios.post('http://127.0.0.1:8000/injury/', injury, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
        }
        catch(error) {
            console.log(error, 'Invalid input');
        }
    }
    
    //Fantasy Team






    render() {
        const user = this.state.loggedInUser
        return (
            <div>
                <div>
                <NavigationBar user={user}/>
                </div>

                <Switch>
                <Route path='/' exact={true} render={(props) => {
                    if (!user) {
                        return <Redirect to= '/Login' />
                    } else {
                        return (<Home {...props} user={user}/>)
                        }
                    }}
                />               
                
                <Route path='/Login' render={props => <Login {...props} loginUser={this.loginUser}/>} />
                <Route path='/Register' render={props => <Register {...props} registerNewUser={this.registerNewUser}/>} /> 
                <Route path='/Home' render={props => <Home {...props}  />} />
                <Route path='/Profile' render={props => <Profile {...props} />} />
                <Route path='/Injury' render={props => <Injury {...props} user={this.state.loggedInUser} getAllInjury={this.state.injuries} deleteInjury={this.deleteInjury} addNewInjury={this.addNewInjury} editInjury={this.editInjury} />}/>                
                <Route path='/CommentBoard' render={props => <CommentBoard {...props} getAllComments={this.state.comments} user={this.state.loggedInUser} addNewComment={this.addNewComment} deleteComment={this.deleteComment} />} />               
                <Route path='/Team' render={props => <Team {...props} user={this.state.loggedInUser} addPlayer={this.addPlayer} addFavorite={this.addFavorite} fantasyPlayers={this.state.fantasyPlayers}/>} />               
                </Switch>                
            </div>

        )
    }
}

export default App