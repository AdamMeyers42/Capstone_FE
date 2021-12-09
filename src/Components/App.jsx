import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from './Login/Login';
import Register from './Register/Register';
import NavigationBar from './NavigationBar/NavigationBar';
import CommentBoard from './CommentBoard/CommentBoard';  
import Home from './HomeScreen/Home';
// import CreateProduct from './CreateProduct/CreateProduct'
// import DisplayProducts from './DisplayProducts/DisplayProducts';
// import ShoppingCart from './ShoppingCart/ShoppingCart'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// import Footer from './Footer/Footer';
// import SearchBar from './SearchBar/SearchBar';

// const tokenFromStorage = localStorage.getItem('token');
// localStorage.removeItem('token')

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: null,
            comments: [],
            refresh: "",
            jwt: "",
        };
    }
    
    componentDidMount() {
        
        const jwt = localStorage.getItem('token');

        try {
            const user = jwtDecode(jwt);
            this.setState({loggedInUser: user });

        } catch (error) {
            console.log(error);
        }

        this.getAllComments()
    }

    registerNewUser = async (user) => {
        console.log("User object from Register: ", user)
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
        console.log("User object from login:", login)
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
            
            window.location = ('/')

        } catch (error) {
            alert('Invalid username or password')
        }
  
    }

    // getAllProducts = async () => {
    //     let response = await axios.get('https://localhost:44394/api/Product/')
    //     this.setState({
    //         products: response.data
    //     });
    // }

    // addNewProduct = async (product) => {
    //     try{
    //         const response = await axios.post('https://localhost:44394/api/Product', product);
    //         this.product = ({'Name': product.Name, 'Description': product.Description, 'Price': product.Price, 'Category': product.Category})
    //         this.setState({
    //             products: response.data
    //         });
    //     }
    //     catch(error) {
    //         console.log(error, 'Invalid input');
    //     }
        
        
    // }
    // , { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}
    // searchProducts = (results) => {
    //     this.setState({
    //         products: results
    //     })
    // }

    getAllComments = async () => {
        let response = await axios.get('http://127.0.0.1:8000/comment/');
        this.setState({
            comments: response.data
        });
    }

    addNewComment = async (comment) => {
        try{
            console.log("Comment inside func")
            console.log(comment)
            const response = await axios.post('http://127.0.0.1:8000/comment/', comment);
            this.comment = ({'UserName': comment.User_id, 'Comment': comment.comment})
            // this.setState({
            //     comments: response.data
            // });
        }
        catch(error) {
            console.log(error, 'Invalid input');
        }
    }
 
    

    render() {
const user = this.state.loggedInUser
        return (
            <div>
                <div>
                <NavigationBar user={user}/>
                {/* <SearchBar /> */}
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
                <Route path='/Home' />              
                <Route path='/CommentBoard' render={props => <CommentBoard {...props} getAllComments={this.state.comments} User_id={this.state.loggedInUser} addNewComment={this.addNewComment} />} />               
                </Switch>
                {/* <Footer/> */}
                
            </div>

        )
    }
}

export default App