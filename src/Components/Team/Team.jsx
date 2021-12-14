import React from "react";
import './Team.css';
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar} from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { faHeartbeat} from '@fortawesome/free-solid-svg-icons';


const Team = (props) => {

    const jwt = localStorage.getItem('token');

    const handleAdd = (playerId) => {
        const user = jwtDecode(jwt);
        const userPlayer = {
            userId: user.userId,
            playerId: playerId,
            teamName: "my cool team",
            playerPosition: "QB"
        }
        props.addPlayer(userPlayer)
        window.location = ('/Team') 
    }

    const handleFavorite = (userPlayerId, favoriteStatus) => {
        const favePlayer = {
            userPlayerId: userPlayerId,
            favoriteStatus: favoriteStatus,
        }
        props.addFavorite(favePlayer)
        window.location = ('/Team') 
    }

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
                    {props.getAllPlayers.map((player) => {
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
                                    <td><button onClick={() => handleAdd(player.player.id)}>Add Player</button></td>
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
                    {props.fantasyPlayers.map((player) => {
                        let image = ""
                        if (player.officialImageSrc) {
                            image = player.officialImageSrc
                        } else {
                            image = "image/defaultpic.jpg"
                        }
                        return (
                            <tbody>
                                <tr>
                                    {/* if (player.favoriteStatus == "False") {
                                        <td onClick={() => handleFavorite(player.userPlayerId, player.favoriteStatus)}><FontAwesomeIcon icon={regularStar} /></td>
                                    } else {
                                        <td onClick={() => handleFavorite(player.userPlayerId, player.favoriteStatus)}><FontAwesomeIcon icon={solidStar} /></td>
                                    } */}
                                    <td onClick={() => handleFavorite(player.userPlayerId, player.favoriteStatus)}><FontAwesomeIcon icon={solidStar} /></td>
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
}
export default Team;