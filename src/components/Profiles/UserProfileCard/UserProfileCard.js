import Avatar from "@material-ui/core/Avatar";

const UserProfileCard = ({username, profilePic, description}) => {
    return (
        <section className="user-card-container">
            <p className="user-card-username"><strong>{username ? username : "user"}</strong></p>
            <Avatar
                className="user-profile-avatar"
                alt={profilePic || ""}
                src={profilePic || ""}
            >
            </Avatar>
            <article className="profile-description-container">
                <h4 className="profile-description-title">Description</h4>
                <p className="profile-description-text">{description}</p>
            </article>

            <style jsx="true">{`
              .user-card-container {
                max-width: 400px;
                margin: 0 auto;
                text-align: center;
                display: flex;
                flex-flow: column wrap;
                justify-content: center;
                align-items: center;
                border: 1px solid lightgray;
                border-radius: 5px;
                padding: 10px 20px;
                background: white;
              }

              .user-profile-avatar {
                height: 130px;
                width: 130px;
                margin: 0 auto 20px auto;
              }

              .profile-description-title,
              .user-card-username {
                border-bottom: 1px solid #9d9d9d;
              }

              .profile-description-container  {
                white-space: pre;
              }

              .profile-description-text {
                white-space: pre-line;
                min-height: 20px;
                min-width: 180px;
                border: 1px solid lightgray;
                border-radius: 5px;
                margin-top: 0;
                padding: 20px;
                background: #FCF6F5FF;
              }

            `}
            </style>
        </section>
    );
}

export default UserProfileCard;