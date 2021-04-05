const GridPostImage = ({imageURL}) => {
    return (
        <article className="grid-post-image">
            <img src={imageURL} alt="post-img"/>

            <style jsx>{`
              .grid-post-image img {
                width: 100%;
                height: 175px;
                object-fit: fill;
                display: block;
                margin: 0 auto 15px auto;
                border-bottom: 1px solid lightgrey;
              }
            `}
            </style>
        </article>
    );
}

export default GridPostImage;