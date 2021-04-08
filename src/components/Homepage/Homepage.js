import Newsfeed from "../NewsFeed/NewsFeed";
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

            <Newsfeed fetchData={getAllPosts}/>

        </div>
    );
}

export default Homepage;