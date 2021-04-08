import {Link} from "react-router-dom";

const GridPostImage = ({imageURL, postID}) => {
    return (
        <article className="grid-post-image">
            <Link to={`/posts/${postID}`} >
                <img src={imageURL} alt="post-img"/>
            </Link>

            <style jsx="true">{`
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