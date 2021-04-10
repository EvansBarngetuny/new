import {useContext, useEffect, useState} from "react";
import AppCtx from "../../context/AppCtx";
import {Link} from "react-router-dom";
import {db} from "../../firebase";
import GridNewsFeed from "../NewsFeed/GridNewsFeed";
import {getLikedPostsByUser, getPostsByOwner, getUserFavouritePosts} from "../../utils/data";
import GenericGuestPage from "../GenericGuestPage/GenericGuestPage";
import MyProfileCard from "./MyProfileCard/MyProfileCard";
import Spinner from "../../common/components/Spinner/Spinner";

const MyProfile = () => {
    const [profilePic, setProfilePic] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const {authUser, authUserID} = useContext(AppCtx)

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = db.collection('users')
            .doc(authUserID || '-1')
            .onSnapshot((snapshot => {
                setIsLoading(false);
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


    if (!authUser) {
        return GenericGuestPage();
    }

    return (
        <div className={"my-profile-page-container" + (authUser ? ' logged-user' : '')}>
            <h1 className="my-profile-header">My profile</h1>

            {
                isLoading && <Spinner/>
            }

            <MyProfileCard
                username={authUser.displayName}
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
                <h3 className="my-profile-favourite-posts-header">Last posts you've added to favourites</h3>
                <GridNewsFeed
                    fetchData={() => getUserFavouritePosts(authUserID, 6)}
                />
                <p><Link to="/my-favourites">See all favourites</Link></p>
            </section>

            <section className="my-profile-favourite-posts">
                <h3 className="my-profile-favourite-posts-header">Last post you've liked</h3>
                <GridNewsFeed
                    fetchData={() => getLikedPostsByUser(authUserID, 6)}
                />
                <p><Link to="/my-liked-posts">See all liked posts</Link></p>
            </section>

            <style jsx="true">{`
              .my-profile-page-container {
                background: #F4F4F4;
                border-left: 1px solid lightgray;
                border-right: 1px solid lightgray;
                border-bottom: 1px solid lightgray;
                padding: 20px;
              }

              .my-profile-header {
                color: #434343;
                margin-top: 0;
                border-bottom: 1px solid lightgray;
              }

              .my-profile-favourite-posts-header {
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

export default MyProfile;