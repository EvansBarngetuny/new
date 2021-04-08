import {useContext} from "react";
import AppCtx from "../../../context/AppCtx";
import GenericGuestPage from "../../GenericGuestPage/GenericGuestPage";
import MainNewsFeed from "../MainNewsFeed";
import {getPostsByOwner, getUserFavouritePosts} from "../../../utils/data";
import MyPublications from "./MyPublications";

const UserPublications = ({match}) => {
    const userID = match.params.id;
    const {currentUser, authUserID} = useContext(AppCtx);

    if (!currentUser) {
        return GenericGuestPage();
    }

    if (authUserID === userID) {
        return MyPublications();
    }

    return (
        <div className="my-favourites-container">
            <h1>Here are all the posts by this user</h1>

            <MainNewsFeed fetchData={() => getPostsByOwner(userID)} />

            <style jsx="true">{`
              .my-favourites-container {
                margin-left: 16rem;
              }
              
            `}
            </style>
        </div>
    );
}

export default UserPublications;