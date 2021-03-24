const PostContent = ({
    username,
    caption
}) => {
    return (
        <article className="post-content">
            <p className="post-content-text">
                <strong>{username}</strong> {caption}
            </p>

            <style jsx>{`
              .post-content-text {
                font-weight: normal;
                margin: 10px;
              }
            `}
            </style>
        </article>
    );
}

export default PostContent;