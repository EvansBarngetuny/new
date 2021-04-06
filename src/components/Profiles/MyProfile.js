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

    const {currentUser} = useContext(AppCtx)
    const userID = currentUser ? currentUser.uid : undefined

    useEffect(() => {
        //setIsLoading(true);
        const unsubscribe = db.collection('users')
            .doc(userID)
            .onSnapshot((snapshot => {
                //setIsLoading(false);
                if (userID && snapshot.data()) {
                    const {profilePic} = snapshot.data();
                    const {description} = snapshot.data();
                    setProfilePic(profilePic)
                    setDescription(description);
                }
            }));

        return () => {
            unsubscribe()
        }

    }, [userID]);


    if (!currentUser) {
        return GenericGuestPage();
    }

    return (
        <div className="my-profile-page-container">
            <h1 className="my-profile-header">My profile</h1>

            <MyProfileCard
                username={currentUser.displayName}
                profilePic={profilePic}
                description={description}
                userID={userID}
            />

            <section className="my-profile-favourite-posts">
                <h3 className="my-profile-favourite-posts-header">Your latest publications</h3>
                <GridNewsFeed
                    fetchData={() => getPostsByOwner(currentUser.uid, 6)}
                />
                <p><Link to="/my-publications">See all publications</Link></p>
            </section>

            <section className="my-profile-favourite-posts">
                <h3 className="my-profile-favourite-posts-header">Your last saved posts</h3>
                <GridNewsFeed
                    fetchData={() => getUserFavouritePosts(currentUser.uid, 6)}
                />
                <p><Link to="/my-favourites">See all favourites</Link></p>
            </section>

            <style jsx={true}>{`
              .my-profile-page-container {
                background: white;
                border-left: 1px solid lightgray;
                border-right: 1px solid lightgray;
                border-bottom: 1px solid lightgray;
                padding: 20px;
                margin-left: 16rem;
              }
              
              .my-profile-header {
                margin-top: 0;
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