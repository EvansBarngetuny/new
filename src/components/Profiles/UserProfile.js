import {Link} from "react-router-dom";
import {getPostsByOwner} from "../../utils/data";
import GridNewsFeed from "../NewsFeed/GridNewsFeed";
import {useContext, useEffect, useState} from "react";
import AppCtx from "../../context/AppCtx";
import {Redirect} from "react-router-dom";
import {db} from "../../firebase";
import UserProfileCard from "./UserProfileCard/UserProfileCard";

const UserProfile = ({match}) => {
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [description, setDescription] = useState('');
    const userID = match.params.id;
    const {currentUser, authUserID} = useContext(AppCtx);
    let isSameUser = userID === authUserID;

    useEffect(() => {
        //setIsLoading(true);
        const unsubscribe = db.collection('users')
            .doc(userID)
            .onSnapshot((snapshot => {
                //setIsLoading(false);
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
        <div className={"user-profile-container" + (currentUser ? ' logged-user' : '')}>
            <h1>User's profile page</h1>

            <UserProfileCard
                username={username}
                profilePic={profilePic}
                description={description}
            />

            <section className="my-profile-favourite-posts">
                <h3>Latest publications by {username ? username : 'this user'}</h3>
                <GridNewsFeed
                    fetchData={() => getPostsByOwner(userID, 6)}
                />
                <p><Link to={"/user-publications/" + userID}>See all publications by {username ? username : 'this user'}</Link></p>
            </section>

            <style jsx="true">{`
              .user-profile-container {
                margin-left: 16rem;
                background: white;
                border: 1px solid lightgray;
                padding: 15px;
              }
              
            `}
            </style>
        </div>
    );
}

export default UserProfile;