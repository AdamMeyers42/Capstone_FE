import React from "react";
import CommentInput from "../CommentInput/CommentInput";
import './CommentBoard.css';


const CommentBoard = (props) => {

    const handleDelete = (commentId) => {
        props.deleteComment(commentId)
        window.location = ('/CommentBoard') 
    }

    return (
        <div>
            <div class="h-25">
                <CommentInput {...props} addNewComment={props.addNewComment} />
            </div>
            <div>
                <table className="table-container">
                    <thead>
                        <tr class="teamRow">
                            <th>User</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {props.getAllComments.map((comment) => {   
                        return (
                            <tbody>
                                <tr class="teamRow">                        
                                    <td>{comment.username}</td>
                                    <td>{comment.comment}</td>
                                    <td><button onClick={() => handleDelete(comment.commentId)}>delete</button></td>
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