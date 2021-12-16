import React, { Component } from 'react';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends Component {
    constructor(props) {
        super(props);

    }

    showSearch = () => {
        let ul = document.querySelector(".ulSearch");
        ul.style.display = 'block';
    }
    
    populateSearch = (searchTerm) => {
        console.log(searchTerm)
        let liId = "#"+searchTerm.searchTerm+searchTerm.userId
        let liValue = document.querySelector(liId).value;
        let input = document.querySelector(".searchTerm");
        input.value = liValue;
    }

    render(){
        return (
            <div class="wrap">
            <div class="search">
            <input onClick={() => this.showSearch()} type="text" class="searchTerm" placeholder="Search by position"/>
            <button onClick={() => this.props.handleSearch()} type="submit" class="searchButton">
                <FontAwesomeIcon icon={faSearch} />  
            </button>
            </div>
            <ul class="ulSearch">
                {this.props.searchTerms.map((searchTerm) => {
                    return(
                    <li onClick={() => this.populateSearch(searchTerm)} class="liSearch" id={searchTerm.searchTerm+searchTerm.userId}>{searchTerm.searchTerm}</li>
                )})}
            </ul>
        </div>
        )
}}
export default Search;