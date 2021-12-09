import React from "react";
import { useHistory } from "react-router";

const CommentBoard = (props) => {
    // const user = localStorage.getItem('token')

    const handleSubmit = (event) => {
        event.preventDefault();
        const comment = {
            User_id: event.target[0].value,
            comment: event.target[1].value,
        };
        console.log("Comment outside func")
        console.log(event)
        console.log(comment)
        props.addNewComment(comment);
    }

    return (
        <div>

            <title> SMACK TALK  </title>
            <div>
                    <form onSubmit={handleSubmit}>
                        <label for="User_id">Username:</label><br/>
                        <input type="text" id="User_id" name="User_id" value={props.User_id.user_id}/><br/>
                        <label for="comment">Comment:</label><br/>
                        <input type="text" id="comment" name="comment" placeholder="Add comment here..."/><br/><br/>
                        <input type="submit" value="Submit" onClick={props.addNewComment()}/>
                    </form>
            </div>
            <div>
                <table className="table-container">
                    <thead>
                        <tr>
                            <th> User </th>
                            <th> Comment </th>
                        </tr>
                    </thead>
                    {props.getAllComments.map((comment) => {   
                        return (
                            <tbody>
                                <tr>                        
                                    <td>{comment.User_id}</td>
                                    <td>{comment.comment}</td>
                                </tr>              
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
    );
};

export default CommentBoard;