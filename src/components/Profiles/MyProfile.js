import {useContext, useEffect, useState} from "react";
import AppCtx from "../../context/AppCtx";
import {Link} from "react-router-dom";
import {db, storage} from "../../firebase";
import GridNewsFeed from "../NewsFeed/GridNewsFeed";
import {getPostsByOwner, getUserFavouritePosts} from "../../utils/data";
import GenericGuestPage from "../GenericGuestPage/GenericGuestPage";
import MyProfileCard from "./MyProfileCard";

const MyProfile = () => {
    const [profilePic, setProfilePic] = useState('');
    const [description, setDescription] = useState('');

    const {currentUser, authUserID} = useContext(AppCtx)

    useEffect(() => {
        //setIsLoading(true);
        const unsubscribe = db.collection('users')
            .doc(authUserID || '-1')
            .onSnapshot((snapshot => {
                //setIsLoading(false);
                if (authUserID && snapshot.data()) {
                    const {profilePic} = snapshot.data();
                    const {description} = snapshot.data();
                    setProfilePic(profilePic)
                    setDescription(description);
                }
            }));

        return () => {
            unsubscribe()
        }

    }, [authUserID]);


    if (!currentUser) {
        return GenericGuestPage();
    }

    return (
        <div className={"my-profile-page-container" + (currentUser ? ' logged-user' : '')}>
            <h1 className="my-profile-header">My profile</h1>

            <MyProfileCard
                username={currentUser.displayName}
                profilePic={profilePic}
                description={description}
                userID={authUserID}
            />

            <section className="my-profile-favourite-posts">
                <h3 className="my-profile-favourite-posts-header">Your latest publications</h3>
                <GridNewsFeed
                    fetchData={() => getPostsByOwner(authUserID, 6)}
                />
                <p><Link to="/my-publications">See all publications</Link></p>
            </section>

            <section className="my-profile-favourite-posts">
                <h3 className="my-profile-favourite-posts-header">Your last saved posts</h3>
                <GridNewsFeed
                    fetchData={() => getUserFavouritePosts(authUserID, 6)}
                />
                <p><Link to="/my-favourites">See all favourites</Link></p>
            </section>

            <style jsx={true}>{`
              .my-profile-page-container {
                background: #FDFDEB;
                border-left: 1px solid lightgray;
                border-right: 1px solid lightgray;
                border-bottom: 1px solid lightgray;
                padding: 20px;
              }
              
              .my-profile-header {
                margin-top: 0;
                border-bottom: 1px solid lightgray;
              }
              
              .my-profile-favourite-posts-header {
                border-bottom: 1px solid lightgray;
              }

            `}
            </style>
        </div>

    );
}

export default MyProfile;