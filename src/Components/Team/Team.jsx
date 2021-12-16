import React, { Component } from 'react';
import './Team.css';
import jwtDecode from "jwt-decode";
import axios from 'axios';
import Favorite from '../Favorite/Favorite';
import Search from '../Search/Search';

class Team extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this)
        this.state = {
            players: [],
            fantasyPlayers: [],
            searchTerms: [],
        };
    }

    handleSearch = () => {
        
        let searchTerm = document.querySelector(".searchTerm").value;
        this.search(searchTerm)
    }

    search = async (searchTerm) => {
        const jwt = localStorage.getItem('token');
        const user = jwtDecode(jwt);
        let response = await axios.get('http://127.0.0.1:8000/players/?searchTerm=' + searchTerm + '&userId=' + user.userId);
        this.setState({ players: response.data})
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
        
        this.getSearchTerms()
        this.getAllPlayers()
        this.getAllFantasyPlayers(user.userId)
    }



     handleAdd = (player) => {
        const jwt = localStorage.getItem('token');
        const user = jwtDecode(jwt);
        let teamName = ""
        if (!player.player.currentTeam.abbreviation) {
            teamName = "N/A"
        } else {
            teamName = player.player.currentTeam.abbreviation
        }
        const userPlayer = {
            userId: user.userId,
            playerId: player.player.id,
            teamName: teamName,
            playerPosition: player.player.primaryPosition
        }

        this.addPlayer(userPlayer)
        window.location = ('/Team')
    }

     handleFavorite = (player) => {
        let favoriteStatus = true
        if (player.favoriteStatus == "True") {
            favoriteStatus = false
        } 
        const favePlayer = {
            userPlayerId: player.userPlayerId,
            favoriteStatus: favoriteStatus,
        }
        this.addFavorite(favePlayer)
        window.location = ('/Team')
    }

    getAllPlayers = async () => {
        let response = await axios.get('http://127.0.0.1:8000/players/');
        this.setState({ players: response.data})
    }

    addPlayer = async (userPlayer) => {
        let response = await axios.post('http://127.0.0.1:8000/players/', userPlayer, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
        this.setState({
            players: response.data
        });
    }

    addFavorite = async (favePlayer) => {

        try{
            const response = await axios.put('http://127.0.0.1:8000/team/', favePlayer, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
        }
        catch(error) {
            console.log(error, 'Invalid input');
        }
    }

    getAllFantasyPlayers = async (userId) => {
        let response = await axios.get('http://127.0.0.1:8000/team/?userId=' + userId);
        this.setState({ fantasyPlayers: response.data})
    }

    getSearchTerms = async () => {
        const jwt = localStorage.getItem('token');
        const user = jwtDecode(jwt);
        let response = await axios.get('http://127.0.0.1:8000/searchTerms/?userId=' + user.userId);
        this.setState({ searchTerms: response.data})
    }

    render(){
    return (
        <div class="row"> 
            <div class="column">
                <h2>Available Players</h2>
                <Search handleSearch={this.handleSearch} searchTerms={this.state.searchTerms} />
                <table>
                    <thead>
                        <tr>
                            <th>Profile Picture</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Primary Position</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {this.state.players.map((player) => {
                        let image = ""
                        if (player.player.officialImageSrc) {
                            image = player.player.officialImageSrc
                        } else {
                            image = "image/defaultpic.jpg"
                        }
                        return (
                            <tbody>
                                <tr class="teamRow">
                                    <td><img src={image}/></td>
                                    <td>{player.player.firstName}</td>
                                    <td>{player.player.lastName}</td>
                                    <td>{player.player.primaryPosition}</td>
                                    <td><button onClick={() => this.handleAdd(player)}>Add Player</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
            <div class="column">
                <h2>Fantasy Team</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Favorite</th>
                            <th>Profile Picture</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Primary Position</th>
                        </tr>
                    </thead>
                    {this.state.fantasyPlayers.map((player) => {
                        let image = ""
                        if (player.officialImageSrc) {
                            image = player.officialImageSrc
                        } else {
                            image = "image/defaultpic.jpg"
                        }
                        return (
                            <tbody>
                                <tr class="teamRow">
                                    <td onClick={() => this.handleFavorite(player)}><Favorite favoriteStatus={player.favoriteStatus}/></td>
                                    <td><img src={image}/></td>
                                    <td>{player.firstName}</td>
                                    <td>{player.lastName}</td>
                                    <td>{player.playerPosition}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
        
    )
}}
export default Team;