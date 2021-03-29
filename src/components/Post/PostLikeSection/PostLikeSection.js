import {useContext} from "react";
import AppCtx from "../../../context/AppCtx";

const PostLikeSection = ({
        isLiked,
        onLike,
        onUnLike,
        likesCount,
        isFavourite,
        onAddToFavourites,
        onRemoveFromFavourites
    }) => {

    return (
        <article className="post-like-section">
            <span className="post-like-section-reacts">
                <strong>{likesCount} {'react' + (likesCount === 1 ? '' : 's')}</strong>
            </span>

            <div>
                {
                    isLiked
                        ? (<button onClick={onUnLike} className="post-like-section-react-btn">UnReact</button>)
                        : (<button onClick={onLike} className="post-like-section-react-btn" >React</button>)
                }

                {
                    isFavourite
                        ? (<button onClick={onRemoveFromFavourites} className="post-like-section-addFavourite-btn">Remove from Favourites</button>)
                        : (<button onClick={onAddToFavourites} className="post-like-section-addFavourite-btn">Save to Favourites</button>)
                }

            </div>

            <style jsx="true">{`
              .post-like-section {
                display: flex;
                flex-flow: row wrap;
                margin-left: 10px;
              }

              .post-like-section-react-btn,
              .post-like-section-addFavourite-btn {
                margin: 0 5px;
              }

            `}
            </style>
        </article>
    );
}

export default PostLikeSection;