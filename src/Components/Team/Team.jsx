import React, { useState, useEffect, Component } from 'react';
import './Team.css';
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar} from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { faHeartbeat} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            fantasyPlayers: [],
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
    }

     handleFavorite = (player) => {
        let favoriteStatus = false
        if (player.favoriteStatus) {
            favoriteStatus = true
        } 
        const favePlayer = {
            userPlayerId: player.userPlayerId,
            favoriteStatus: favoriteStatus,
        }
        this.addFavorite(favePlayer)
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

    render(){
    return (
        <div class="row"> 
            <div class="column">
                <h2>Available Players</h2>
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
                                    {/* if (player.favoriteStatus == "False") {
                                        <td onClick={() => handleFavorite(player.userPlayerId, player.favoriteStatus)}><FontAwesomeIcon icon={regularStar} /></td>
                                    } else {
                                        <td onClick={() => handleFavorite(player.userPlayerId, player.favoriteStatus)}><FontAwesomeIcon icon={solidStar} /></td>
                                    } */}
                                    <td onClick={() => this.handleFavorite(player)}><FontAwesomeIcon icon={solidStar} /></td>
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