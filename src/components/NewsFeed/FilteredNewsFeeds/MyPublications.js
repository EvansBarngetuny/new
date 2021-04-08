import {useContext} from "react";
import AppCtx from "../../../context/AppCtx";
import GenericGuestPage from "../../GenericGuestPage/GenericGuestPage";
import {getPostsByOwner} from "../../../utils/data";
import MainNewsFeed from "../MainNewsFeed";

const MyPublications = () => {
    const {currentUser, authUserID} = useContext(AppCtx);

    if (!currentUser) {
        return GenericGuestPage();
    }

    return (
        <div className="my-publications-container">
            <h1>This is a list of all the posts you've published</h1>

            <MainNewsFeed fetchData={() => getPostsByOwner(authUserID)} />

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