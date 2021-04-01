import PostContent from "./PostContent/PostContent";
import PostImage from "./PostImage/PostImage";
import {db} from "../../firebase";
import {useContext} from "react";
import AppCtx from "../../context/AppCtx";

const GridPost = ({post, postID}) => {
    const {currentUser} = useContext(AppCtx);

    const editPost = (newCaption, toggleEditPost) => {
        db.collection('posts')
            .doc(postID)
            .update({content: newCaption})
            .then(() => toggleEditPost())
            .catch(err => console.log(err))
    }

    return (
        <section className="grid-post-container">
            <PostImage imageURL={post.imageURL}/>

            <PostContent
                postedBy={post.postedBy}
                content={post.content}
                onSave={editPost}
                isOwner={currentUser && currentUser.uid === post.ownerID}
            />

            <style jsx="true">{`
              .grid-post-container {
                width: 260px;
                border-right: 1px solid lightgray;
                border-left: 1px solid lightgray;
                border-bottom: 1px solid lightgray;
                margin: 2px;
                padding-bottom: 4px;
              }

            `}
            </style>
        </section>
    );
}

export default GridPost;