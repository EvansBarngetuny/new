import PostHeader from "./PostHeader/PostHeader";
import PostImage from "./PostImage/PostImage";
import PostContent from "./PostContent/PostContent";
import PostCommentsSection from "./PostCommentsSection/PostCommentsSection";
import PostAddComment from "./PostAddComment/PostAddComment";
import {useContext, useEffect, useState} from "react";
import {db} from "../../firebase";
import AppCtx from "../../context/AppCtx";
import PostLikeSection from "./PostLikeSection/PostLikeSection";
import LikeCounter from "../../common/components/LikeCounter/LikeCounter";
import {
    addToFavourites,
    deleteComment, deletePost,
    editComment, editPost,
    likePost,
    removeFromFavourites,
    unlikePost
} from "../../utils/data";

const Post = ({post, postID}) => {
    const [profilePic, setProfilePic] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [isFavourite, setIsFavourite] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [comments, setComments] = useState([]);
    const {currentUser} = useContext(AppCtx);

    useEffect(() => {
        const unsubscribe = db.collection('posts')
            .doc(postID)
            .onSnapshot(snapshot => {
                if (snapshot.data()) {
                    const postLikes = snapshot.data().likes;
                    const postFavourites = snapshot.data().inFavourites;
                    if (currentUser) {
                        setIsFavourite(postFavourites.includes(currentUser.uid));
                        setIsLiked(postLikes.includes(currentUser.uid));
                    }
                    setLikesCount(postLikes.length);
                }
            });

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

    }, []);

    useEffect(() => {
        const unsubscribe = db.collection('users')
            .doc(post.ownerID)
            .onSnapshot((snapshot => {
                if (snapshot.data()) {
                    setProfilePic(snapshot.data().profilePic)
                }
            }));

        return () => {
            unsubscribe()
        }

    }, []);

    const onEditComment = editComment.bind(null, postID);
    const onEditPost = editPost.bind(null, postID);
    const onDeleteComment = deleteComment.bind(null, postID);

    return (
        <section className="post-container">
            <PostHeader
                postedBy={post.postedBy}
                profilePic={profilePic}
                onDelete={() => deletePost(postID)}
                isOwner={currentUser && currentUser.uid === post.ownerID}
                userID={post.ownerID}
            />

            <PostImage imageURL={post.imageURL}/>

            {
                currentUser
                    ? (
                        <PostLikeSection
                            isLiked={isLiked}
                            onUnLike={() => unlikePost(postID, currentUser.uid)}
                            onLike={() => likePost(postID, currentUser.uid)}
                            likesCount={likesCount}
                            isFavourite={isFavourite}
                            onAddToFavourites={() => addToFavourites(postID, currentUser.uid)}
                            onRemoveFromFavourites={() => removeFromFavourites(postID, currentUser.uid)}
                        />
                    )
                    : (<LikeCounter likesCount={likesCount} text="react"/>)
            }

            <PostContent
                userID={post.ownerID}
                postedBy={post.postedBy}
                content={post.content}
                onSave={onEditPost}
                isOwner={currentUser && currentUser.uid === post.ownerID}
            />

            <PostCommentsSection
                comments={comments}
                onSave={onEditComment}
                onDelete={onDeleteComment}
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

            <style jsx='true'>{`
              .post-container {
                background: #FDFDEB;
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