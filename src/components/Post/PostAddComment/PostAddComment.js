const PostAddComment = () => {
    return (
        <article className="post-add-comments">
            <input className="post-add-comments-input" type="text"/>
            <button className="post-add-comments-btn">Add Comment</button>

            <style jsx>{`
              .post-add-comments {
                padding: 10px;
                text-align: center;
              }

              .post-add-comments-input,
              .post-add-comments-btn {
                border: 1px solid lightgrey;
                border-radius: 5px;
                padding: 5px 15px;
                margin: 5px;
              }

              .post-add-comments-input {
                width: 69%;
                margin-right: 15px;
                outline: none;
              }

              .post-add-comments-btn {
                background: white;
                color: #515151;
              }

              .post-add-comments-btn:hover {
                cursor: pointer;
                background: #f1f1f1;
              }
            `}
            </style>
        </article>
    );
}

export default PostAddComment;