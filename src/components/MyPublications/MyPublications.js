import {useContext} from "react";
import AppCtx from "../../context/AppCtx";
import GenericGuestPage from "../GenericGuestPage/GenericGuestPage";
import {getPostsByOwner} from "../../utils/data";
import Newsfeed from "../NewsFeed/NewsFeed";

const MyPublications = () => {
    const {currentUser, authUserID} = useContext(AppCtx);

    if (!currentUser) {
        return GenericGuestPage();
    }

    return (
        <div className="my-publications-container">
            <h1>This is a list of all the posts you've published</h1>

            <Newsfeed fetchData={() => getPostsByOwner(authUserID)} />

            <style jsx="true">{`
              .my-publications-container {
                margin-left: 16rem;
              }

            `}
            </style>
        </div>
    );
}

export default MyPublications;