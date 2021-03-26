import {useState} from "react";
import {Button} from "@material-ui/core";

const PostContent = ({postedBy, caption, isEditOpen, onCancel}) => {
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
                            <Button className="post-content-edit-button">Save</Button>
                            <Button onClick={onCancel} className="post-content-edit-button">Cancel</Button>
                        </div>
                    </div>
                )
            }

            <style jsx>{`
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

              .edit-field-label {
              }

              .edit-field {
                padding: 5px 5px 5px 0;
                border-top: 1px solid lightgray;
                border-bottom: 1px solid lightgray;
              }

              .post-content-edit-button {
              }
            `}
            </style>
        </article>
    );
}

export default PostContent;