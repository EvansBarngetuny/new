import {useState} from "react";
import {Button} from "@material-ui/core";

const PostContent = ({postedBy, caption, isEditOpen, onEdit, onSave, onCancel}) => {
    const [editCaption, setEditCaption] = useState(caption);

    return (
        <article className="post-content">
            <p className="post-content-text">
                <strong>{postedBy}</strong> {caption}
            </p>

            {
                isEditOpen && (
                    <div className="post-content-text edit-field">
                        <label className="edit-field-label" htmlFor="">Here you can edit your caption</label>
                        <textarea
                            className="post-content-textarea"
                            value={editCaption}
                            onChange={(e) => setEditCaption(e.target.value)}
                        />
                        <div>
                            <Button onClick={() => onSave(editCaption)} className="post-content-edit-button" title="Save your caption">Save</Button>
                            <Button onClick={onCancel} className="post-content-edit-button" title="Close edit">Cancel</Button>
                        </div>
                    </div>
                )
            }

            <button onClick={onEdit} className="post-content-btn" title="Edit your caption"><img
                src="/edit-icon.svg"
                alt="delete-icon"
                height="15"
                width="15"
            />
            </button>

            <style jsx>{`
              .post-content {
                position: relative;
              }
              .post-content-text {
                font-weight: normal;
                margin: 10px 10px;
              }

              .post-content-textarea {
                height: max-content;
                width: 100%;
                margin: 10px 10px 5px 0;
                border: 1px solid lightgray;
              }
              
              .edit-field {
                padding: 5px;
                border-top: 1px solid lightgray;
                border-bottom: 1px solid lightgray;
                border-left: 1px solid lightgray;
              }

              .post-content-btn {
                position: absolute;
                top: 0;
                right: 15px;
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 1px 3px;
              }
            `}
            </style>
        </article>
    );
}

export default PostContent;