import PostHeader from "./PostHeader/PostHeader";
import PostImage from "./PostImage/PostImage";
import PostContent from "./PostContent/PostContent";
import PostCommentsSection from "./PostCommentsSection/PostCommentsSection";
import PostAddComment from "./PostAddComment/PostAddComment";

const Post = () => {
    return (
        <section className="post-container">
            <PostHeader/>

            <PostImage/>

            <PostContent/>

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