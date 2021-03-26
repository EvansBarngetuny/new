import PostHeader from "./PostHeader/PostHeader";
import PostImage from "./PostImage/PostImage";
import PostContent from "./PostContent/PostContent";
import PostCommentsSection from "./PostCommentsSection/PostCommentsSection";
import PostAddComment from "./PostAddComment/PostAddComment";
import {useContext, useEffect, useState} from "react";
import {db} from "../../firebase";
import AppCtx from "../../context/AppCtx";

const Post = ({post, postID}) => {
    const [comments, setComments] = useState([]);
    const currentUser = useContext(AppCtx);
    //const isOwner = currentUser && currentUser.uid === post.ownerID;

    useEffect(() => {
       db.collection('posts')
           .doc(postID)
           .collection('comments')
           .orderBy('timestamp', 'asc')
           .onSnapshot((snapshot => {
               setComments(snapshot.docs.map(doc => ({
                   id: doc.id,
                   comment: doc.data()
               })));
           }));

    }, [postID]);

    const deletePost = () => {
        db.collection('posts')
            .doc(postID)
            .delete()
            .catch(err => console.log(err))
    }

    const editPost = () => {
        console.log(postID)
    }

    return (
        <section className="post-container">
            <PostHeader
                postedBy={post.username}
                profilePic={post.profilePic}
                onDelete={deletePost}
                onEdit={editPost}
                displayDelete={currentUser && currentUser.uid === post.ownerID}
            />

            <PostImage imageURL={post.imageURL}/>

            <PostContent postedBy={post.username} caption={post.caption}/>

            <PostCommentsSection comments={comments} />

            {
                currentUser && (<PostAddComment username={currentUser.displayName} postID={postID} />)
            }

            <style jsx>{`
              .post-container {
                background: white;
                max-width: 600px;
                margin: 0 auto 40px auto;
                border: 1px solid lightgrey;
                box-shadow: 0 0 5px 0.5px #0000003b;
              }
            `}
            </style>
        </section>
    );
}

export default Post;