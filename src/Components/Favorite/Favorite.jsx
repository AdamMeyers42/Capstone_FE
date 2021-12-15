import React, { Component } from 'react';
import './Favorite.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar} from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';


class Favorite extends Component {
    constructor(props) {
        super(props);

    }

    render(){
        if (this.props.favoriteStatus == 'True') {
            return (
                <FontAwesomeIcon icon={solidStar} />            
            )  
        }
        return (
            <FontAwesomeIcon icon={regularStar} />           
        )
}}
export default Favorite;