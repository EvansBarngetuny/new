const PostContent = ({postedBy, caption}) => {
    return (
        <article className="post-content">
            <p className="post-content-text">
                <strong>{postedBy}</strong> {caption}
            </p>

            <style jsx>{`
              .post-content-text {
                font-weight: normal;
                margin: 5px 10px;
              }
            `}
            </style>
        </article>
    );
}

export default PostContent;