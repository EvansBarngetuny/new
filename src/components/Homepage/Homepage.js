import CreateNewPost from "../CreateNewPost/CreateNewPost";
import CreateNewPostGuest from "../CreateNewPost/CreateNewPostGuest";
import Newsfeed from "../NewsFeed/NewsFeed";
import AppCtx from "../../context/AppCtx";
import {useContext} from "react";

const Homepage = () => {
    const {currentUser} = useContext(AppCtx);

    return (
        <main className={'homepage-container' + (currentUser ? ' logged-user' : '')}>

            {
                currentUser
                    ? (<CreateNewPost />)
                    : (<CreateNewPostGuest />)
            }

            <Newsfeed />

            <style jsx>{`
              .homepage-container.logged-user {
                margin-left: 16rem;
              }
              
            `}
            </style>
        </main>
    );
}

export default Homepage;