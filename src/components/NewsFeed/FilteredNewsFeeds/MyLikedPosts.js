import {useContext} from "react";
import AppCtx from "../../../context/AppCtx";
import GenericGuestPage from "../../GenericGuestPage/GenericGuestPage";
import {getLikedPostsByUser} from "../../../utils/data";
import MainNewsFeed from "../MainNewsFeed";

const MyLikedPosts = (props) => {
    const {authUser, authUserID} = useContext(AppCtx);

    if (!authUser) {
        return GenericGuestPage();
    }

    return (
        <div className="my-liked-posts-container">
            <h1 className="my-liked-posts-header">My liked posts</h1>

            <MainNewsFeed fetchData={() => getLikedPostsByUser(authUserID)}/>

            <style jsx="true">{`
              .my-liked-posts-container {
                margin-left: 16rem;
              }

              .my-liked-posts-header {
                margin-left: 10px;
                border-bottom: 1px solid lightgray;
                color: #434343;
              }
            `}
            </style>
        </div>
    );
}

export default MyLikedPosts;