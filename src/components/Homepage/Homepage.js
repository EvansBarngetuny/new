import CreateNewPost from "../CreateNewPost/CreateNewPost";
import CreateNewPostGuest from "../CreateNewPost/CreateNewPostGuest";
import Newsfeed from "../NewsFeed/NewsFeed";
import AppCtx from "../../context/AppCtx";
import {useContext} from "react";

const Homepage = () => {
    const currentUser = useContext(AppCtx);

    return (
        <main>

            {
                currentUser
                    ? (<CreateNewPost />)
                    : (<CreateNewPostGuest />)
            }

            <Newsfeed />

        </main>
    );
}

export default Homepage;