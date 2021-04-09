import {useState} from "react";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const PostContent = (props) => {
    const [newContent, setNewContent] = useState(props.content);
    const [openEditSection, setOpenEditSection] = useState(false);

    const toggleEditSection = () => {
        setOpenEditSection(!openEditSection);
    }

    return (
        <article className="post-content">
            <p className="post-content-text">
                <Link to={`/users/${props.userID}`}>
                    <strong>{props.postedBy} </strong>
                </Link>
                {props.content}
            </p>

            {
                openEditSection && (
                    <div className="post-content-text edit-field">
                        <label className="edit-field-label" htmlFor="">Here you can edit the content</label>
                        <textarea
                            className="post-content-textarea"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                        />
                        <div>
                            <Button onClick={() => props.onSave(newContent, toggleEditSection, props.commentID)}
                                    className="post-content-edit-button"
                                    title="Save your caption"
                            >
                                Save
                            </Button>

                            <Button onClick={() => toggleEditSection()}
                                    className="post-content-edit-button"
                                    title="Close edit"
                            >
                                Cancel
                            </Button>

                            {
                                props.onDelete && (
                                    <Button
                                        onClick={() => props.onDelete(props.commentID)}
                                        className="post-content-delete-button"
                                        title="Delete your comment"
                                    >
                                        Delete Comment
                                    </Button>
                                )
                            }

                        </div>
                    </div>
                )
            }

            {
                props.isOwner && (
                    <button onClick={() => setOpenEditSection(!openEditSection)} className="post-content-btn"
                            title="Edit your caption"><img
                        src="/edit-icon.svg"
                        alt="edit-icon"
                        height="15"
                        width="15"
                    />
                    </button>
                )
            }

            <style jsx="true">{`
              .post-content {
                position: relative;
              }

              .post-content-text {
                font-weight: normal;
                margin: 10px 10px;
                padding-right: 25px;
              }

              .post-content-text a {
                text-decoration: none;
                color: #000000;
              }

              .post-content-textarea {
                font-family: Roboto, sans-serif;
                font-style: italic;
                font-size: 15px;
                height: max-content;
                width: 97%;
                margin: 10px 10px 5px 5px;
                padding-left: 5px;
                border: 1px solid lightgray;
                border-radius: 5px;
              }

              .edit-field {
                box-sizing: border-box;
                background: #fafafa;
                padding: 5px;
                border: 1px solid lightgray;
                border-radius: 5px;
              }

              .post-content-btn {
                position: absolute;
                top: 0;
                right: 15px;
                background: transparent;
                border: none;
                outline: none;
                cursor: pointer;
                padding: 1px 3px;
              }
              
              .post-content-btn:hover {
                border: 1px solid gray;
                border-radius: 3px;
              }

              .post-content-edit-button {
                text-align: right;
              }
            `}
            </style>
        </article>
    );
}

export default PostContent;