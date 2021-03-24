const PostContent = () => {
    return (
        <article className="post-content">
            <p className="post-content-text">
                <strong>username</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, porro!
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