import {Link} from "react-router-dom";
import {getPostsByOwner} from "../../utils/data";
import GridNewsFeed from "../NewsFeed/GridNewsFeed";
import {useContext, useEffect, useState} from "react";
import AppCtx from "../../context/AppCtx";
import {Redirect} from "react-router-dom";
import {db} from "../../firebase";
import UserProfileCard from "./UserProfileCard/UserProfileCard";
import Spinner from "../../common/components/Spinner/Spinner";

const UserProfile = ({match}) => {
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const userID = match.params.id;
    const {authUser, authUserID} = useContext(AppCtx);
    let isSameUser = userID === authUserID;

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = db.collection('users')
            .doc(userID)
            .onSnapshot((snapshot => {
                setIsLoading(false);
                if (userID && snapshot.data()) {
                    const {profilePic} = snapshot.data();
                    const {description} = snapshot.data();
                    const {username} = snapshot.data();
                    setProfilePic(profilePic)
                    setDescription(description);
                    setUsername(username);
                }
            }));

        return () => {
            unsubscribe()
        }

    }, [userID]);

    if (isSameUser) {
        return <Redirect to="/my-profile"/>
    }

    return (
        <div className={"user-profile-container" + (authUser ? ' logged-user' : '')}>
            <h1 className="user-profile-header">Profile page {username}</h1>

            {
                isLoading && <Spinner/>
            }

            <UserProfileCard
                username={username}
                profilePic={profilePic}
                description={description}
            />

            <section className="my-profile-favourite-posts">
                <h3 className="user-profile-latest-publications">Latest publications
                                                                 by {username ? username : 'this user'}</h3>
                <GridNewsFeed
                    fetchData={() => getPostsByOwner(userID, 6)}
                />

                <p><Link to={"/user-publications/" + userID}>See all publications
                                                             by {username ? username : 'this user'}</Link></p>
            </section>

            <style jsx="true">{`
              .user-profile-container {
                margin-left: 16rem;
                background: #F4F4F4;
                border: 1px solid lightgray;
                padding: 15px;
              }

              .user-profile-header {
                color: #434343;
              }

              .user-profile-header,
              .user-profile-latest-publications {
                border-bottom: 1px solid lightgray;
              }

              .my-profile-favourite-posts a {
                text-decoration: none;
                color: #1c1c1c;
              }

              .my-profile-favourite-posts a:hover {
                text-decoration: underline;
              }

            `}
            </style>
        </div>
    );
}

export default UserProfile;