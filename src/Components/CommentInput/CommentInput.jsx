import React from "react";
import jwtDecode from 'jwt-decode';
import './CommentInput.css';
import Button from 'react-bootstrap/Button';

const CommentInput = (props) => {
    let user = ""
    const jwt = localStorage.getItem('token');

    const handleSubmit = (event) => {
        event.preventDefault();
        const comment = {
            userId: event.target[0].value,
            comment: event.target[1].value,
        };
        props.addNewComment(comment);
        window.location = ('/CommentBoard')
    }

    if (jwt) {
            user = jwtDecode(jwt);
        return (
            <form onSubmit={handleSubmit} >
                <div class="row">
                    <div class="column">
                        <input type="hidden" id="userId" name="userId" value={user.userId}/><br/>
                        <input className="text" type="text" id="comment" name="comment" placeholder="Add comment here..."/><br/><br/>
                        <input className="submit" type="submit" value="Submit"/>
                    </div>
                    <div>

                    </div>
                </div>
            </form>
        )
    } 

    return (
        <p>Login to leave a comment</p>
    )
}
   
export default CommentInput;
