import Avatar from '@material-ui/core/Avatar';

const Post = () => {
    return (
        <section className="post-container">
            <article className="post-header">
                <Avatar
                    className="post-header-avatar"
                    alt="username"
                    src=""
                />
                <h3 className="post-header-username">username</h3>
            </article>
            <article className="post-image">
                <img src="https://miro.medium.com/max/1404/0*ZeJO8KPaD-tfK2oK.jpeg" alt="post-img"/>
            </article>
            <article className="post-content">
                <p className="post-content-text">
                    <strong>username</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, porro!
                </p>
            </article>
            <article className="post-comment-section">
                <p className="post-content-text">
                    <strong>
                        other.user
                    </strong>
                    <span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
                    deleniti dignissimos distinctio eaque eius hic maiores repellendus
                    sapiente voluptas? Asperiores aspernatur consequuntur fugit mollitia nisi
                    quasi quidem reprehenderit voluptatem voluptates.
                    </span>
                </p>
            </article>
            <article className="post-add-comments">
                <input className="post-add-comments-input" type="text"/>
                <button className="post-add-comments-btn" >Add Comment</button>
            </article>
        </section>
    );
}

export default Post;