import React from "react";
import { useHistory } from "react-router";
import jwtDecode from 'jwt-decode';
import CommentInput from "../CommentInput/CommentInput";
import axios from 'axios';

const CommentBoard = (props) => {

    const handleDelete = (commentId) => {
        props.deleteComment(commentId)
        window.location = ('/CommentBoard') 
    }

    return (
        <div>
            <h1>SMACK TALK</h1>
            <div>
                <CommentInput {...props} addNewComment={props.addNewComment} />
            </div>
            <div>
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {props.getAllComments.map((comment) => {   
                        return (
                            <tbody>
                                <tr>                        
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