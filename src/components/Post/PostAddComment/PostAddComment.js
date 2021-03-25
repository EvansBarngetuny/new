import {Button, Input} from "@material-ui/core";
import {useState} from "react";
import {auth, db} from "../../../firebase";
import firebase from "firebase";

const PostAddComment = ({postID}) => {
    const [comment, setComment] = useState('');
    const username = auth.currentUser.displayName;

    const postComment = (ev) => {
        ev.preventDefault();

        if (comment === '') {
            return
        }

        db.collection("posts")
            .doc(postID)
            .collection("comments")
            .add({
                content: comment,
                username: username,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .catch(err => console.log(err));

        setComment('');
    }

    return (
        <article>
            <form onSubmit={postComment} className="post-add-comments-container">
                <Input
                    className="post-add-comments-input"
                    type="text"
                    placeholder="Your comment..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <Button type="submit" className="post-add-comments-btn" >Add comment</Button>
            </form>

            <style jsx>{`
              .post-add-comments-container {
                display: flex;
                align-items: center;
                flex-flow: row wrap;
                border-top: 1px solid lightgray;
              }
              
              .post-add-comments-input {
                flex-grow: 1;
                margin: 5px 5px 15px 7px;
                padding: 0 5px;
                outline: none;
              }
              
              .post-add-comments-btn {
                flex-grow: 0;
                margin: 0 5px;
              }
              
            `}
            </style>
        </article>
    );
}

export default PostAddComment;