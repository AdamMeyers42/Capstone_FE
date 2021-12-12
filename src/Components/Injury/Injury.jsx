import React from "react";
import jwtDecode from "jwt-decode";
import './Injury.css'

const Injury = (props) => {

    const jwt = localStorage.getItem('token');
    
    const handleDelete = (injuryReportId) => {
        props.deleteInjury(injuryReportId)
        window.location = ('/Injury') 
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const injury = {
            playerTeam: event.target[0].value,
            playerName: event.target[1].value,
            injury: event.target[2].value,
            duration: event.target[3].value,
        };
        props.addNewInjury(injury);
        window.location = ('/Injury')
    }

    const showEdit = (injuryReportId) => {
       let editRow = document.querySelector("#injury-"+injuryReportId);
       let display = toggleShowEdit(editRow.style.display)
       editRow.style.display = display;
    }

    const handleEdit = (injuryReportId) => {
        console.log("B")
        let playerTeamValue = document.querySelector("#playerTeam-"+injuryReportId).value;
        let playerNameValue = document.querySelector("#playerName-"+injuryReportId).value;
        let injuryValue = document.querySelector("#injury-"+injuryReportId).value;
        let durationValue = document.querySelector("#duration-"+injuryReportId).value;
        const injury = {
            id: injuryReportId,
            playerTeam: playerTeamValue,
            playerName: playerNameValue,
            injury: injuryValue,
            duration: durationValue,
        };
         props.editInjury(injury,injuryReportId);
         window.location = ('/Injury')
         console.log("E")
     }

    const toggleShowEdit = (display) => {
        if (display == "table-row") {
            return "none"
        } else {
            return "table-row"
        }
    }

    return (
        <div class="row"> 
            <div class="column">
                <form onSubmit={handleSubmit}>
                    <label for="playerTeam">Player Team:</label><br/>
                    <input className="text" type="text" id="playerTeam" name="playerTeam" placeholder="Add Fantasy Team"/><br/>
                    <label for="playerName">Player Name:</label><br/>
                    <input className="text" type="text" id="playerName" name="playerName" placeholder="Add Player Name"/><br/><br/>
                    <label for="injury">Injury:</label><br/>
                    <input className="text" type="text" id="injury" name="injury" placeholder="Description of Injury"/><br/><br/>
                    <label className="label" for="duration">Estimated Time Out:</label><br/>
                    <input className="text" type="text" id="duration" name="duration" placeholder="Estimated Time Out"/><br/><br/>
                    <input className="submit" type="submit" value="Submit"/>
                </form>
            </div>
                <h2>Injured Players</h2>
            <div class="column">
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
                        return (
                            <tbody>
                                <tr>
                                    <td>{injuryReport.playerTeam}</td>
                                    <td>{injuryReport.playerName}</td>
                                    <td>{injuryReport.injury}</td>
                                    <td>{injuryReport.duration}</td>
                                    <td><button onClick={() => handleDelete(injuryReport.id)}>Delete</button><button onClick={() => showEdit(injuryReport.id)}>Edit</button></td>
                                </tr>
                                <tr  class="editRow" id={'injury-'+injuryReport.id}>
                                    <td>
                                        <input className="text" type="text" id={'playerTeam-'+injuryReport.id} name="playerTeam" placeholder="Edit Team"/>
                                    </td>
                                    <td>
                                        <input className="text" type="text" id={'playerName-'+injuryReport.id} name="playerName" placeholder="Edit Player Name"/>
                                    </td>
                                    <td>
                                        <input className="text" type="text" id={'injury-'+injuryReport.id} name="injury" placeholder="Edit Injury"/>
                                    </td>
                                    <td>
                                        <input className="text" type="text" id={'duration-'+injuryReport.id} name="duration" placeholder="Edit Time Out"/>
                                    </td>
                                    <td>
                                        <button onClick={() => handleEdit(injuryReport.id)}>Submit</button>  
                                    </td>                                            
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
        
    )
}
export default Injury;