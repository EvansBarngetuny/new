import MainNewsFeed from "../NewsFeed/MainNewsFeed";
import AppCtx from "../../context/AppCtx";
import {useContext} from "react";
import {getAllPosts} from "../../utils/data";
import GenericGuestPage from "../GenericGuestPage/GenericGuestPage";

const Homepage = () => {
    const {currentUser} = useContext(AppCtx);

    return (
        <div className={'homepage-container' + (currentUser ? ' logged-user' : '')}>

            {
                !currentUser && (<GenericGuestPage />)
            }

            <MainNewsFeed fetchData={getAllPosts}/>

        </div>
    );
}

export default Homepage;