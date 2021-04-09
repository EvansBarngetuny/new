import LikeCounter from "../../../common/components/LikeCounter/LikeCounter";

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
            <LikeCounter likesCount={likesCount} text={"react"}/>

            <div>
                {
                    isLiked
                        ? (<button onClick={onUnLike} className="post-like-section-button">Undo React</button>)
                        : (
                            <button onClick={onLike} className="post-like-section-button">
                                <img
                                    src="/react-logo-icon.svg"
                                    alt="react-logo"
                                    height="15"
                                    width="15"
                                />
                                <span>React</span>
                            </button>
                        )
                }

                {
                    isFavourite
                        ? (<button onClick={onRemoveFromFavourites} className="post-like-section-button">Remove from
                                                                                                         Favourites</button>)
                        : (<button onClick={onAddToFavourites} className="post-like-section-button">
                            <img
                                src="/bookmark-icon.svg"
                                alt="react-logo"
                                height="15"
                                width="15"
                            />
                            <span>Save to Favourites</span>
                        </button>
                        )
                }

            </div>

            <style jsx="true">{`
              .post-like-section {
                display: flex;
                flex-flow: row wrap;
                align-items: center;
              }

              .post-like-section-button {
                font-family: Roboto, sans-serif;
                position: relative;
                margin: 0 5px 0 10px;
                padding: 5px;
                border: 1px solid lightgray;
                border-radius: 5px;
                background: white;
                color: #1f1f1f;
              }

              .post-like-section-button:hover {
                cursor: pointer;
                background: #eeeeee;
              }
              
              .post-like-section-button span {
                padding: 0 5px 0 22px;
              }
              
              .post-like-section-button img {
                position: absolute;
                left: 7px;
              }

            `}
            </style>
        </article>
    );
}

export default PostLikeSection;