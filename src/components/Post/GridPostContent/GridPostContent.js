import {Link} from "react-router-dom";

const GridPostContent = ({userID, postedBy, content}) => {
    const postContent = content.length <= 45
        ? content
        : content.substring(0, 44) + '...';

    return (
        <article className="grid-post-content">
            <p className="grid-post-content-text">
                <Link to={`/users/${userID}`}>
                    <strong>{postedBy}</strong>
                </Link>
                {postContent}
            </p>

            <style jsx="true">{`
              .grid-post-content {
                position: relative;
              }

              .grid-post-content-text {
                font-weight: normal;
                margin: 10px 10px;
              }

              .grid-post-content-text a {
                margin-right: 7px;
                text-decoration: none;
                color: #000000;
              }

            `}
            </style>
        </article>
    );
}

export default GridPostContent;