import React, { Component } from "react";
import "./Home.css";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Favorite from "../Favorite/Favorite";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            standings: [],
            favorites: [],
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
        
        this.getStandings()
        this.getFavoritePlayers(user.userId)
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
        window.location = ('/Home')
    }

    getFavoritePlayers = async (userId) => {
        let response = await axios.get('http://127.0.0.1:8000/favorites/?userId=' + userId);
        this.setState({
            favorites: response.data
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

    // If API call fails, as it does, pull from local storage for the saved response.
    // Otherwise, set the state and local storage on a successful API call.
    getStandings = async () => {
        let newStandings = {}
        let response =  axios.get('https://api.mysportsfeeds.com/v2.1/pull/nfl/2021-2022-regular/standings.json', { headers: {Authorization: 'Basic ' + 'MDA1ZWY3YTAtZmFhMC00YTE4LTkwOTItYjM1NWQwOk1ZU1BPUlRTRkVFRFM='}});
        if (!response.data) {
            newStandings = JSON.parse(localStorage.getItem("standings"))
        } else {
            newStandings = response.data
            localStorage.setItem("standings", newStandings)
        }
        this.setState({
            standings: newStandings
        });
    }

    render(){
        console.log("here our my standings")
        console.log(this.state.standings)
        return (
            <div class="row">
            <div class="column">
            <table>
                <thead>
                    <tr>
                        <th>Team Logo</th>
                        <th>Team Name</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>NFL Ranking</th>
                    </tr>
                </thead>
                <tbody>
                {JSON.parse(localStorage.getItem("standings")).teams.map((team) => {
                    let colors = team.team.teamColoursHex
                    let image = ""
                    if (team.team.officialLogoImageSrc) {
                        image = team.team.officialLogoImageSrc
                    } else {
                        image = "image/defaultpic.jpg"
                    }
                    return (
                            <tr style={{backgroundColor: colors[0]}}>
                                <td class="teamLogoTd"><img class="teamLogo" src={image}/></td>
                                <td>{team.team.name}</td>
                                <td>{team.stats.standings.wins}</td>
                                <td>{team.stats.standings.losses}</td>
                                <td>{team.overallRank.rank}</td>
                            </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
            <div class="column">
                <table>
                    <thead>
                        <tr>
                            <th>Unfavorite</th>
                            <th>Profile Picture</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Stats</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.favorites.map((player) => {
                            let image = ""
                            if (player.officialImageSrc) {
                                image = player.officialImageSrc
                            } else {
                                image = "image/defaultpic.jpg"
                            }
                            console.log(player)
                            return (
                                    <tr class="teamRow">
                                        <td onClick={() => this.handleFavorite(player)}><Favorite favoriteStatus={player.favoriteStatus} /></td>
                                        <td><img src={image}/></td>
                                        <td>{player.firstName}</td>
                                        <td>{player.lastName}</td>
                                        <td>{player.playerPosition}</td>
                                    </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            </div>
    );
}};

export default Home;