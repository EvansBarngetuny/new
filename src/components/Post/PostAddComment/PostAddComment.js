import {Button, Input} from "@material-ui/core";
import {useState} from "react";
import {db} from "../../../firebase";
import firebase from "firebase";
import {addDocumentToSubCollection} from "../../../utils/api";

const PostAddComment = ({postID, postedBy, ownerID}) => {
    const [comment, setComment] = useState('');

    const postComment = (ev) => {
        ev.preventDefault();

        if (comment === '') {
            return
        }

        const data = {
            content: comment,
            postedBy: postedBy,
            ownerID: ownerID,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        };

        addDocumentToSubCollection('posts', postID, 'comments', data)
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
                <Button type="submit" className="post-add-comments-btn">Add comment</Button>
            </form>

            <style jsx="true">{`
              .post-add-comments-container {
                background: #F2F2F2;
                display: flex;
                align-items: center;
                flex-flow: row wrap;
                border-top: 1px solid lightgray;
                border-radius: 5px;
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