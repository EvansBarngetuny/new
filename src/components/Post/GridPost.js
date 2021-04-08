import PostContent from "./PostContent/PostContent";
import {useContext} from "react";
import AppCtx from "../../context/AppCtx";
import GridPostImage from "./GridPostImage/GridPostImage";
import {deletePost, editPost} from "../../utils/data";

const GridPost = ({post, postID}) => {
    const {currentUser} = useContext(AppCtx);
    const isOwner = currentUser && currentUser.uid === post.ownerID;

    const onEditPost = editPost.bind(null, postID);

    return (
        <section className="grid-post-container">
            <GridPostImage imageURL={post.imageURL} postID={postID}/>
            {
                isOwner && (
                    <button onClick={() => deletePost(postID)}
                            className="grid-post-del-btn delete" title="Delete this post">
                        <img
                            src="/delete-icon.svg"
                            alt="delete-icon"
                            height="15"
                            width="15"
                        />
                    </button>
                )
            }

            <PostContent
                userID={post.ownerID}
                postedBy={post.postedBy}
                content={post.content}
                onSave={onEditPost}
                isOwner={currentUser && currentUser.uid === post.ownerID}
            />

            <style jsx={true}>{`
              .grid-post-container {
                position: relative;
                width: 260px;
                border-right: 1px solid lightgray;
                border-left: 1px solid lightgray;
                border-bottom: 1px solid lightgray;
                margin: 2px;
                padding-bottom: 4px;
                background: white;
              }

              .grid-post-del-btn {
                position: absolute;
                right: 8px;
                top: 10px;
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 1px 3px;
                outline: none;
              }

              .grid-post-del-btn:hover {
                border: 1px solid gray;
                border-radius: 3px;
              }

            `}
            </style>
        </section>
    );
}

export default GridPost;