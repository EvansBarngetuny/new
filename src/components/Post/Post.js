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

    const {currentUser} = useContext(AppCtx);

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
            .catch(err => console.log(err));

        //need to manually iterate through the sub-collection 'comments'
        //and delete every item in order to remove the entire collection
        clearCollection()

        function clearCollection() {
            const ref = db.collection('posts')
                .doc(postID)
                .collection('comments');

            ref.onSnapshot((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    ref.doc(doc.id).delete()
                })
            })
        }
    }

    const editPost = (newCaption, toggleEditPost) => {
        db.collection('posts')
            .doc(postID)
            .update({content: newCaption})
            .then(() => toggleEditPost())
            .catch(err => console.log(err))
    }

    const editComment = (newCaption, toggleEditPost, commentID) => {
        db.collection('posts')
            .doc(postID)
            .collection('comments')
            .doc(commentID)
            .update({content: newCaption})
            .then(() => toggleEditPost())
            .catch(err => console.log(err))
    }

    const deleteComment = (toggleEditPost, commentID) => {
        db.collection('posts')
            .doc(postID)
            .collection('comments')
            .doc(commentID)
            .delete()
            .then(() => toggleEditPost())
            .catch(err => console.log(err));
    }

    return (
        <section className="post-container">
            <PostHeader
                postedBy={post.postedBy}
                profilePic={post.profilePic}
                onDelete={deletePost}
                isOwner={currentUser && currentUser.uid === post.ownerID}
            />

            <PostImage imageURL={post.imageURL}/>

            <PostContent
                postedBy={post.postedBy}
                content={post.content}
                onSave={editPost}
                isOwner={currentUser && currentUser.uid === post.ownerID}
            />

            <PostCommentsSection
                comments={comments}
                onSave={editComment}
                onDelete={deleteComment}
                currentUser={currentUser}
            />

            {
                currentUser && (
                    <PostAddComment
                        postedBy={currentUser.displayName}
                        ownerID={currentUser.uid}
                        postID={postID}
                    />
                )
            }

            <style jsx>{`
              .post-container {
                background: white;
                max-width: 600px;
                margin: 0 auto 40px auto;
                border: 1px solid lightgrey;
                border-radius: 5px;
                box-shadow: 0 0 5px 0.5px #0000003b;
              }
              
            `}
            </style>
        </section>
    );
}

export default Post;