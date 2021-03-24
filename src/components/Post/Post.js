import PostHeader from "./PostHeader/PostHeader";
import PostImage from "./PostImage/PostImage";
import PostContent from "./PostContent/PostContent";
import PostCommentsSection from "./PostCommentsSection/PostCommentsSection";
import PostAddComment from "./PostAddComment/PostAddComment";

const Post = ({post}) => {
    return (
        <section className="post-container">
            <PostHeader username={post.username} profilePic={post.profilePic}/>

            <PostImage imageURL={post.imageURL}/>

            <PostContent username={post.username} caption={post.caption}/>

            <PostCommentsSection/>

            <PostAddComment/>

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