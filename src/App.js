import './App.css';
import Header from "./components/Header/Header";
import Newsfeed from "./components/NewsFeed/NewsFeed";
import CreateNewPost from "./components/CreateNewPost/CreateNewPost";
import CreateNewPostGuest from "./components/CreateNewPost/CreateNewPostGuest";
import {useEffect, useState} from "react";
import {auth} from "./firebase";
import {AppCtxProvider} from "./context/AppCtx";

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

            <AppCtxProvider value={currentUser} >
            <Header />

            {
                currentUser
                    ? (<CreateNewPost />)
                    : (<CreateNewPostGuest />)
            }

            <Newsfeed />
            </AppCtxProvider>
        </div>
    );
}

export default App;
