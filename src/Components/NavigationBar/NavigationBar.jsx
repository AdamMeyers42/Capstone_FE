import React from 'react';
import './NavigationBar.css';
import { Link } from 'react-router-dom';


const NavBar = ({user}) => {

    const logoutUser = () => {
        localStorage.removeItem('token');
        window.location = ('/')
    }

    return (
<nav>
    
       {user && <h4> Welcome {user.username} </h4>}
            <ul>
                        <Link to ='/Home'> <li>Home</li> </Link>
                        {/* <Link to ='/Products'> <li>Products</li> </Link>
                        <Link to ='/ShoppingCart'> <li>Shopping Cart</li> </Link>
                        <Link to ='/CreateProduct'> <li>Add New Product</li> </Link> */}
                {!user &&
                    <React.Fragment>
                        <Link to ='/Login'> <li>Login</li> </Link>
                        <Link to ='/Register'> <li>Register</li> </Link>                   
                </React.Fragment>
                }
                {user && 
                    <React.Fragment>
                       
                        <Link onClick={() => logoutUser()}> <li> Logout </li></Link>
                    
                    </React.Fragment>
                }
            </ul>
   
</nav>
    );
}

export default NavBar;