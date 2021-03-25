import './App.css';
import Header from "./components/Header/Header";
import Newsfeed from "./components/NewsFeed/NewsFeed";
import CreateNewPost from "./components/CreateNewPost/CreateNewPost";
import CreateNewPostGuest from "./components/CreateNewPost/CreateNewPostGuest";
import {useEffect, useState} from "react";
import {auth} from "./firebase";

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setCurrentUser(authUser);
            } else {
                setCurrentUser(null);
            }
        });

        return () => {
            unsubscribe()
        };
    }, [currentUser]);

    return (
        <div className="app-wrapper">

            <Header currentUser={currentUser} />

            {
                currentUser
                    ? (<CreateNewPost username={currentUser.displayName}/>)
                    : (<CreateNewPostGuest />)
            }

            <Newsfeed />

        </div>
    );
}

export default App;
