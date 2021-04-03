import Avatar from '@material-ui/core/Avatar';
import {Link} from "react-router-dom";

const PostHeader = (
    {
        postedBy,
        profilePic,
        onDelete,
        isOwner,
        userID
    }
) => {
    return (
        <article className="post-header">
            <Avatar
                className="post-header-avatar"
                alt={postedBy}
                src={profilePic || ''}
            >
                {postedBy[0].toUpperCase()}
            </Avatar>
            <h3 className="post-header-username"><Link to={`/users/${userID}`} >{postedBy}</Link></h3>

            {
                isOwner && (
                    <>
                        <button onClick={onDelete} className="post-header-btn delete" title="Delete this post">
                            <img
                            src="delete-icon.svg"
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
                outline: none;
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