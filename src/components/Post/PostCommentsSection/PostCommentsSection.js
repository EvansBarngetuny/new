const PostCommentsSection = ({comments}) => {
    return (
        <article className="post-comment-section">
            {
                comments.map(c => {
                    return(
                        <p key={c.id} className="post-content-text">
                            <strong>{c.comment.username}</strong>
                            <span> {c.comment.content}</span>
                        </p>
                    );
                })
            }

            <style jsx>{`
              .post-comment-section {
                margin: 15px 0;
              }
              
            `}
            </style>
        </article>
    );
}

export default PostCommentsSection;