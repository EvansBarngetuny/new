import PostContent from "../PostContent/PostContent";

const PostCommentsSection = (props) => {
    return (
        <article className="post-comment-section">
            {
                props.comments.map(c => {
                    return(
                        <PostContent
                            key={c.id}
                            postedBy={c.comment.postedBy}
                            content={c.comment.content}
                            onSave={props.onSave}
                            onDelete={props.onDelete}
                            isOwner={props.currentUser && props.currentUser.uid === c.comment.ownerID}
                            commentID={c.id}
                        />
                    );
                })
            }

            <style jsx>{`
              .post-comment-section {
                margin: 15px 0 20px 0;
              }
            `}
            </style>
        </article>
    );
}

export default PostCommentsSection;