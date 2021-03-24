import Post from "../Post/Post";

const Newsfeed = ({posts}) => {
    return (
        <div className="newsfeed-container">
            {
                posts.map(p => <Post
                    key={p.id}
                    post={p}
                />)
            }
        </div>
    );
}

export default Newsfeed;