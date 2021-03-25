import PostHeader from "./PostHeader/PostHeader";
import PostImage from "./PostImage/PostImage";
import PostContent from "./PostContent/PostContent";
import PostCommentsSection from "./PostCommentsSection/PostCommentsSection";
import PostAddComment from "./PostAddComment/PostAddComment";
import {useEffect, useState} from "react";
import {db} from "../../firebase";

const Post = ({post, postID}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
       if (postID) {
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
       }

    }, [postID]);
    return (
        <section className="post-container">
            <PostHeader username={post.username} profilePic={post.profilePic}/>

            <PostImage imageURL={post.imageURL}/>

            <PostContent username={post.username} caption={post.caption}/>

            <PostCommentsSection comments={comments} />

            <PostAddComment postID={postID}/>

            <style jsx>{`
              .post-container {
                background: white;
                max-width: 600px;
                margin: 0 auto 40px auto;
                border: 1px solid lightgrey;
              }
            `}
            </style>
        </section>
    );
}

export default Post;