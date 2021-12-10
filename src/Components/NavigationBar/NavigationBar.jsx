import React from 'react';
import './NavigationBar.css';
import { Link } from 'react-router-dom';


const NavigationBar = ({user}) => {
    const logoutUser = () => {
        localStorage.removeItem('token');
        window.location = ('/')
    }

    return (
<nav>
    
       {user && <h4> Welcome {user.userId} </h4>}
            <ul>
                        <Link to ='/Home'> <li>Home</li> </Link>
                        <Link to ='/CommentBoard'> <li>CommentBoard</li> </Link>
                        <Link to ='/Team'> <li>Team Management</li> </Link>
                        {/* <Link to ='/CreateProduct'> <li>Add New Product</li> </Link> */}
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

export default NavigationBar;