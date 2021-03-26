import {useState} from "react";
import {Button} from "@material-ui/core";

const PostContent = (props) => {
    const [editContent, setEditContent] = useState(props.content);
    const [openEditSection, setOpenEditSection] = useState(false);

    const toggleEditSection = () => {
        setOpenEditSection(!openEditSection);
    }

    return (
        <article className="post-content">
            <p className="post-content-text">
                <strong>{props.postedBy}</strong> {props.content}
            </p>

            {
                openEditSection && (
                    <div className="post-content-text edit-field">
                        <label className="edit-field-label" htmlFor="">Here you can edit the content</label>
                        <textarea
                            className="post-content-textarea"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                        <div>
                            <Button onClick={() => props.onSave(editContent, toggleEditSection, props.commentID)}
                                    className="post-content-edit-button"
                                    title="Save your caption"
                            >
                                Save
                            </Button>
                            <Button onClick={() => setOpenEditSection(!openEditSection)}
                                    className="post-content-edit-button"
                                    title="Close edit"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )
            }

            {
                props.isOwner && (
                    <button onClick={() => setOpenEditSection(!openEditSection)} className="post-content-btn" title="Edit your caption"><img
                        src="/edit-icon.svg"
                        alt="delete-icon"
                        height="15"
                        width="15"
                    />
                    </button>
                )
            }

            <style jsx>{`
              .post-content {
                position: relative;
              }

              .post-content-text {
                font-weight: normal;
                margin: 10px 10px;
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
              .post-content-edit-button {
                text-align: right;
              }
            `}
            </style>
        </article>
    );
}

export default PostContent;