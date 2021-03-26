import Avatar from '@material-ui/core/Avatar';

const PostHeader = (
    {
        postedBy,
        profilePic,
        onDelete,
        onEdit,
        isOwner
    }
) => {
    return (
        <article className="post-header">
            <Avatar
                className="post-header-avatar"
                alt={postedBy}
                src={profilePic || ''}
            />
            <h3 className="post-header-username">{postedBy}</h3>

            {
                isOwner && (
                    <>
                        <button onClick={onDelete} className="post-header-btn delete"><img
                            src="/delete-icon.svg"
                            alt="delete-icon"
                            height="15"
                            width="15"
                        />
                        </button>
                        <button onClick={onEdit} className="post-header-btn edit"><img
                            src="/edit-icon.svg"
                            alt="delete-icon"
                            height="15"
                            width="15"
                        />
                        </button>
                    </>
                )
            }

            <style jsx>{`
              .post-header {
                display: flex;
                align-items: center;
                padding: 5px 10px;
                position: relative;
              }
              .post-header-btn {
                position: absolute;
                right: 15px;
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 1px 3px;
              }
              .post-header-btn.edit {
                right: 55px;
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