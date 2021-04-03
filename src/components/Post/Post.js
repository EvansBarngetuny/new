import PostHeader from "./PostHeader/PostHeader";
import PostImage from "./PostImage/PostImage";
import PostContent from "./PostContent/PostContent";
import PostCommentsSection from "./PostCommentsSection/PostCommentsSection";
import PostAddComment from "./PostAddComment/PostAddComment";
import {useContext, useEffect, useState} from "react";
import {auth, db} from "../../firebase";
import AppCtx from "../../context/AppCtx";
import PostLikeSection from "./PostLikeSection/PostLikeSection";
import LikeCounter from "../../common/components/LikeCounter/LikeCounter";
import {
    clearSubCollection,
    deleteDocument,
    deleteDocumentInSubCollection,
    updateDocument,
    updateDocumentInSubCollection
} from "../../utils/api";
import admin from "firebase";

const Post = ({post, postID}) => {
    const [isLiked, setIsLiked] = useState(false)
    const [isFavourite, setIsFavourite] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [comments, setComments] = useState([]);
    const {currentUser} = useContext(AppCtx);

    useEffect(() => {
        const unsubscribe = db.collection('posts')
            .doc(postID)
            .onSnapshot(snapshot => {
                const postLikes = snapshot.data().likes;
                if (currentUser) {
                    setIsLiked(postLikes.includes(currentUser.uid));
                }
                setLikesCount(postLikes.length);
            })

        return () => {
            unsubscribe()
        }

    }, [])

    useEffect(() => {
        const unsubscribe = db.collection('posts')
            .doc(postID)
            .onSnapshot(snapshot => {
                const postLikes = snapshot.data().inFavourites;
                if (currentUser) {
                    setIsFavourite(postLikes.includes(currentUser.uid));
                }
            })

        return () => {
            unsubscribe()
        }

    }, [])

    useEffect(() => {
        const unsubscribe = db.collection('posts')
            .doc(postID)
            .collection('comments')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot => {
                setComments(snapshot.docs.map(doc => ({
                    id: doc.id,
                    comment: doc.data()
                })));
            }));

        return () => {
            unsubscribe()
        }

    }, [postID]);

    const deletePost = () => {
        deleteDocument('posts', postID)
            .catch(err => console.log(err.message));

        //need to manually iterate through the sub-collection 'comments'
        //and delete every item in order to remove the entire collection
        //otherwise it remains there even after the post is deleted
        clearSubCollection('posts', postID, 'comments');
    }

    const editPost = (newCaption, toggleEditPost) => {
        updateDocument('posts', postID, {content: newCaption})
            .then(() => toggleEditPost())
            .catch(err => console.log(err))
    }

    const editComment = (newCaption, toggleEditPost, commentID) => {
        const data = {content: newCaption};
        updateDocumentInSubCollection('posts', postID, 'comments', commentID, data)
            .then(() => toggleEditPost())
            .catch(err => console.log(err))
    }

    const deleteComment = (commentID) => {
        deleteDocumentInSubCollection('posts', postID, 'comments', commentID)
            .catch(err => console.log(err));
    }

    const addToFavourites = () => {
        const data = {
            inFavourites: admin.firestore.FieldValue.arrayUnion(currentUser.uid)
        };
        updateDocument('posts', postID, data)
            .then(() => console.log('added to favourites'))
            .catch(err => console.log(err.message));
    }

    const removeFromFavourites = () => {
        const data = {
            inFavourites: admin.firestore.FieldValue.arrayRemove(currentUser.uid)
        };
        updateDocument('posts', postID, data)
            .then(() => console.log('removed from favourites'))
            .catch(err => console.log(err.message));
    }

    const likePost = () => {
        const data = {
            likes: admin.firestore.FieldValue.arrayUnion(currentUser.uid)
        };
        updateDocument('posts', postID, data)
            .then(() => console.log('liked'))
            .catch(err => console.log(err.message));
    }

    const unlikePost = () => {
        const data = {
            likes: admin.firestore.FieldValue.arrayRemove(currentUser.uid)
        };
        updateDocument('posts', postID, data)
            .then(() => console.log('unliked'))
            .catch(err => console.log(err.message));
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

            {
                currentUser
                    ? (
                        <PostLikeSection
                            isLiked={isLiked}
                            onUnLike={unlikePost}
                            onLike={likePost}
                            likesCount={likesCount}
                            isFavourite={isFavourite}
                            onAddToFavourites={addToFavourites}
                            onRemoveFromFavourites={removeFromFavourites}
                        />
                    )
                    : (<LikeCounter likesCount={likesCount} text="react"/>)
            }

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

            <style jsx="true">{`
              .post-container {
                background: white;
                max-width: 600px;
                margin: 0 auto 40px auto;
                border: 1px solid lightgrey;
                border-radius: 5px;
                box-shadow: 0 0 5px 0.5px #0000003b;
              }

              .like-counter {
                margin-left: 10px;
              }

            `}
            </style>
        </section>
    );
}

export default Post;