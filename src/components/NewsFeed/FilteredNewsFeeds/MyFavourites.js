import {useContext} from "react";
import AppCtx from "../../../context/AppCtx";
import GenericGuestPage from "../../GenericGuestPage/GenericGuestPage";
import MainNewsFeed from "../MainNewsFeed";
import {getUserFavouritePosts} from "../../../utils/data";

const MyFavourites = () => {
    const {authUser, authUserID} = useContext(AppCtx);

    if (!authUser) {
        return GenericGuestPage();
    }

    return (
        <div className="my-favourites-container">
            <h1 className="my-favourites-header">My favourites</h1>

            <MainNewsFeed fetchData={() => getUserFavouritePosts(authUserID)} />

            <style jsx="true">{`
              .my-favourites-container {
                margin-left: 16rem;
              }
              
              .my-favourites-header {
                margin-left: 10px;
                border-bottom: 1px solid lightgray;
                color: #434343;
              }
              
            `}
            </style>
        </div>
    );
}

export default MyFavourites;