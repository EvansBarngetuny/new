import {useContext} from "react";
import AppCtx from "../../../context/AppCtx";
import GenericGuestPage from "../../GenericGuestPage/GenericGuestPage";
import MainNewsFeed from "../MainNewsFeed";
import {getUserFavouritePosts} from "../../../utils/data";

const MyFavourites = () => {
    const {currentUser, authUserID} = useContext(AppCtx);

    if (!currentUser) {
        return GenericGuestPage();
    }

    return (
        <div className="my-favourites-container">
            <h1>Here are all the posts you've saved to favourites</h1>

            <MainNewsFeed fetchData={() => getUserFavouritePosts(authUserID)} />

            <style jsx="true">{`
              .my-favourites-container {
                margin-left: 16rem;
              }
              
            `}
            </style>
        </div>
    );
}

export default MyFavourites;