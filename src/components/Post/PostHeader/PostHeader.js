import Avatar from '@material-ui/core/Avatar';

const PostHeader = () => {
    return (
        <article className="post-header">
            <Avatar
                className="post-header-avatar"
                alt="username"
                src=""
            />
            <h3 className="post-header-username">username</h3>
        </article>
    );
}

export default PostHeader;