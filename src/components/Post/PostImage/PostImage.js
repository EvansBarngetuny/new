const PostImage = ({imageURL}) => {
    return (
        <article className="post-image">
            <img src={imageURL} alt="post-img"/>

            <style jsx>{`
              .post-image img {
                object-fit: contain;
                width: 100%;
                display: block;
                margin: 0 auto;
                border-top: 1px solid lightgrey;
                border-bottom: 1px solid lightgrey;
              }
            `}
            </style>
        </article>
    );
}

export default PostImage;