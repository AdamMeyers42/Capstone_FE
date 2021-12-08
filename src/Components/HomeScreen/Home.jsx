import React from "react";
import "./Home.css";
import { useHistory } from "react-router";

const Home = (props) => {

    return (
        <div>

         <title> Items you have for Sale </title>

        <div>
            <table className="table-container">
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Description </th>
                        <th> Price </th>
                        <th> Quanity </th>
                    </tr>
                </thead>
                {/* {props.products.map((product) => {   
                    return (
                        <tbody>
                            <tr>                        
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>$ {product.price}.00</td>
                                <td>{product.quantity}</td>
                                <td><button class="btn btn-outline-light btn-lg" type="submit">Add to Cart</button></td>
                            </tr>              
                        </tbody>
                    )
                })} */}
            </table>
        </div>
        </div>
    );
};

export default Home;