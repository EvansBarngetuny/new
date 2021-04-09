import MainNewsFeed from "../NewsFeed/MainNewsFeed";
import AppCtx from "../../context/AppCtx";
import {useContext} from "react";
import {getAllPosts} from "../../utils/data";
import GenericGuestPage from "../GenericGuestPage/GenericGuestPage";

const Homepage = () => {
    const {authUser} = useContext(AppCtx);

    return (
        <div className={'homepage-container' + (authUser ? ' logged-user' : '')}>

            {
                !authUser && (<GenericGuestPage />)
            }

            <MainNewsFeed fetchData={getAllPosts}/>

        </div>
    );
}

export default Homepage;