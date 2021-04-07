import Newsfeed from "../NewsFeed/NewsFeed";
import AppCtx from "../../context/AppCtx";
import {useContext} from "react";
import {getAllPosts} from "../../utils/data";
import GenericGuestPage from "../GenericGuestPage/GenericGuestPage";

const Homepage = () => {
    const {currentUser} = useContext(AppCtx);

    return (
        <main className={'homepage-container' + (currentUser ? ' logged-user' : '')}>

            {
                !currentUser && (<GenericGuestPage />)
            }

            <Newsfeed fetchData={getAllPosts}/>

            <style jsx={true}>{`
              .homepage-container.logged-user {
                margin-left: 16rem;
              }
              
            `}
            </style>
        </main>
    );
}

export default Homepage;