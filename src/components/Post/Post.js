import PostHeader from "./PostHeader/PostHeader";
import PostImage from "./PostImage/PostImage";
import PostContent from "./PostContent/PostContent";
import PostCommentsSection from "./PostCommentsSection/PostCommentsSection";
import PostAddComment from "./PostAddComment/PostAddComment";
import {useContext, useEffect, useState} from "react";
import {db} from "../../firebase";
import AppCtx from "../../context/AppCtx";
import PostLikeSection from "./PostLikeSection/PostLikeSection";
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
        db.collection('posts')
            .doc(postID)
            .delete()
            .catch(err => console.log(err));

        //need to manually iterate through the sub-collection 'comments'
        //and delete every item in order to remove the entire collection
        //otherwise it remains there despite even after the post is deleted
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

    const deleteComment = (commentID) => {
        db.collection('posts')
            .doc(postID)
            .collection('comments')
            .doc(commentID)
            .delete()
            .catch(err => console.log(err));
    }

    const addToFavourites = () => {
        db.collection('posts')
            .doc(postID)
            .update({
                inFavourites: admin.firestore.FieldValue.arrayUnion(currentUser.uid)
            })
            .then(() => console.log('liked'))
    }

    const removeFromFavourites = () => {
        db.collection('posts')
            .doc(postID)
            .update({
                inFavourites: admin.firestore.FieldValue.arrayRemove(currentUser.uid)
            })
            .then(() => console.log('liked'))
    }

    const likePost = () => {
        db.collection('posts')
            .doc(postID)
            .update({
                likes: admin.firestore.FieldValue.arrayUnion(currentUser.uid)
            })
            .then(() => console.log('liked'))
    }

    const unlikePost = () => {
        db.collection('posts')
            .doc(postID)
            .update({
                likes: admin.firestore.FieldValue.arrayRemove(currentUser.uid)
            })
            .then(() => console.log('unliked'))
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
                    : (
                        <span className="like-counter">
                            <strong>{likesCount} {'react' + (likesCount === 1 ? '' : 's')}</strong>
                        </span>
                    )
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

            <style jsx>{`
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