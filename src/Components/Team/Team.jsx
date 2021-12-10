import React from "react";

const Team = (props) => {

    return (
        <div>
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
    )
}
export default Team;