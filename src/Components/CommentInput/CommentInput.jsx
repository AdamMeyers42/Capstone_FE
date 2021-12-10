import React from "react";
import jwtDecode from 'jwt-decode';

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
            <form onSubmit={handleSubmit} className="form-addComment">
                <input type="hidden" id="userId" name="userId" value={user.userId}/><br/>
                <label for="comment">Comment:</label><br/>
                <input type="text" id="comment" name="comment" placeholder="Add comment here..."/><br/><br/>
                <input type="submit" value="Submit"/>
            </form>
        )
    } 

    return (
        <p>Login to leave a comment</p>
    )
}
   
export default CommentInput;
