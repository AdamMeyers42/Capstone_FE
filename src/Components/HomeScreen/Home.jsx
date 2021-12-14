import React from "react";
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar} from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';

const Home = (props) => {

    const handleFavorite = (userPlayerId, favoriteStatus) => {
        const favePlayer = {
            userPlayerId: userPlayerId,
            favoriteStatus: favoriteStatus,
        }
        props.addFavorite(favePlayer)
        window.location = ('/Home') 
    }


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
            {props.getStandings.teams.map((team) => {
                let colors = team.team.teamColoursHex
                let image = ""
                if (team.team.officialLogoImageSrc) {
                    image = team.team.officialLogoImageSrc
                } else {
                    image = "image/defaultpic.jpg"
                }
                return (
                    <tbody>
                        <tr style={{backgroundColor: colors[0]}}>
                            <td class="teamLogoTd"><img class="teamLogo" src={image}/></td>
                            <td>{team.team.name}</td>
                            <td>{team.stats.standings.wins}</td>
                            <td>{team.stats.standings.losses}</td>
                            <td>{team.overallRank.rank}</td>
                        </tr>
                    </tbody>
                )
            })}
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
                {props.favoriteFantasy.map((player) => {
                        let image = ""
                        if (player.officialImageSrc) {
                            image = player.officialImageSrc
                        } else {
                            image = "image/defaultpic.jpg"
                        }
                        return (
                            <tbody>
                                <tr class="teamRow">
                                    <td onClick={() => handleFavorite(player.userPlayerId, player.favoriteStatus)}><FontAwesomeIcon icon={regularStar} /></td>
                                    <td><img src={image}/></td>
                                    <td>{player.firstName}</td>
                                    <td>{player.lastName}</td>
                                    <td>{player.playerPosition}</td>
                                    {/* <td><button onClick={() => handleAdd(player.player.id)}>Add Player</button></td> */}
                                </tr>
                            </tbody>
                        )
                    })}
            </table>
        </div>
        </div>
    );
};

export default Home;