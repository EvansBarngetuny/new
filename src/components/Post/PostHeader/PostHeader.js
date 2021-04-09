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

    const onDeletePostHandler = () => {
        const confirmed = window.confirm('Are you  sure you want to delete this post?');
        if (confirmed) {
            onDelete();
        }
    }
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
                        <button onClick={onDeletePostHandler} className="post-header-btn delete" title="Delete this post">
                            <img
                            src="/delete-icon.svg"
                            alt="delete-icon"
                            height="15"
                            width="15"
                            />
                        </button>
                    </>
                )
            }

            <style jsx="true">{`
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
              
              .post-header-btn:hover {
                border: 1px solid gray;
                border-radius: 3px;
              }
              
              .post-header-username {
                margin-left: 10px;
              }
              
              .post-header a {
                text-decoration: none;
                color: black;
              }
            `}
            </style>
        </article>
    );
}

export default PostHeader;