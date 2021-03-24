import PostHeader from "./PostHeader/PostHeader";
import PostImage from "./PostImage/PostImage";
import PostContent from "./PostContent/PostContent";
import PostCommentsSection from "./PostCommentsSection/PostCommentsSection";
import PostAddComment from "./PostAddComment/PostAddComment";

const Post = () => {
    return (
        <section className="post-container">
            <PostHeader />

            <PostImage />

            <PostContent />

            <PostCommentsSection />

            <PostAddComment />
        </section>
    );
}

export default Post;