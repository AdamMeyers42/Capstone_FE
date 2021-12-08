import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from './Login/Login';
import Register from './Register/Register';
import NavigationBar from './NavigationBar/NavigationBar'; 
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
            // products: [],
            // shoppingCart: [],
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


        // this.getAllProducts()
        // this.getCartProducts()
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
                user: response.data.token
            });
            this.setState({
                jwt: response.data.token
            });
            localStorage.setItem('token', response.data.token);
            
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

    // searchProducts = (results) => {
    //     this.setState({
    //         products: results
    //     })
    // }

    // getCartProducts = async () => {
    //     let response = await axios.get('https://localhost:44394/api/ShoppingCart/', { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
    //     this.setState({
    //         shoppingCart: response.data
    //     });
    // }
 

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
                {/* <Route path='/Home' />              
                <Route path='/Products' render={props => <DisplayProducts {...props} products={this.state.products}/>} />               
                <Route path='/createProduct' render={props => <CreateProduct {...props} addNewProduct={this.addNewProduct} />} />
                <Route path='/ShoppingCart' render={props => <ShoppingCart {...props} shoppingCart={this.state.shoppingCart} />} /> */}

                </Switch>
                {/* <Footer/> */}
                
            </div>

        )
    }
}

export default App