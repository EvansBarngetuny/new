import Avatar from '@material-ui/core/Avatar';

const PostHeader = ({
    postedBy,
    profilePic,
    onClickHandler,
    displayDelete
}) => {
    return (
        <article className="post-header">
            <Avatar
                className="post-header-avatar"
                alt={postedBy}
                src={profilePic || ''}
            />
            <h3 className="post-header-username">{postedBy}</h3>

            {
                displayDelete && (
                    <button onClick={onClickHandler} className="post-header-delBtn"><img
                        src="/delete-icon.svg"
                        alt="delete-icon"
                        height="15"
                        width="15"
                    />
                    </button>
                )
            }

            <style jsx>{`
              .post-header {
                display: flex;
                align-items: center;
                padding: 5px 10px;
                position: relative;
              }

              .post-header-delBtn {
                position: absolute;
                right: 15px;
                background: white;
                border: none;
                cursor: pointer;
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