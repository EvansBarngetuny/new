import Avatar from '@material-ui/core/Avatar';

const PostHeader = ({postedBy, profilePic}) => {
    return (
        <article className="post-header">
            <Avatar
                className="post-header-avatar"
                alt={postedBy}
                src={profilePic || ''}
            />
            <h3 className="post-header-username">{postedBy}</h3>

            <style jsx>{`
              .post-header {
                display: flex;
                align-items: center;
                padding: 5px 10px;
              }
              .post-header-username {
                margin-left: 10px;
              }
            `}
            </style>
        </article>
    );
}

export default PostHeader;