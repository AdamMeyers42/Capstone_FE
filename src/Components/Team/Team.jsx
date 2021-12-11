import React from "react";
import './Team.css';
import jwtDecode from "jwt-decode";

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

    const handleDelete = (injuryReportId) => {
        props.deleteInjury(injuryReportId)
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
                                <tr>
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
                            <th>Profile Picture</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Primary Position</th>
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
                                <tr>
                                    <td><img src={image}/></td>
                                    <td>{player.player.firstName}</td>
                                    <td>{player.player.lastName}</td>
                                    <td>{player.player.primaryPosition}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
            {/* <h1>Injury Report</h1> */}
            <div class="column">
                <h2>Injured Players</h2>
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Fantasy Team</th>
                            <th>Player Name</th>
                            <th>Injury</th>
                            <th>Estimated Time Out</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {props.getAllInjury.map((injuryReport) => {
                        console.log(injuryReport)
                        return (
                            <tbody>
                                <tr>
                                    <td>{injuryReport.playerTeam}</td>
                                    <td>{injuryReport.playerName}</td>
                                    <td>{injuryReport.injury}</td>
                                    <td>{injuryReport.duration}</td>
                                    <td><button onClick={() => handleDelete(injuryReport.injuryReportId)}>delete</button></td>
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