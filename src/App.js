import './App.css';
import {Route, Switch} from 'react-router-dom';
import Header from "./components/Header/Header";
import {useEffect, useState} from "react";
import {auth} from "./firebase";
import {AppCtxProvider} from "./context/AppCtx";
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import MyPublications from "./components/MyPublications/MyPublications";
import MyFavourites from "./components/MyFavourites/MyFavourites";
import MyProfile from "./components/Profiles/MyProfile";
import UserProfile from "./components/Profiles/UserProfile";
import GenericGuestPage from "./components/GenericGuestPage/GenericGuestPage";
import SinglePostPage from "./components/Post/SinglePostPage";
import UserSearchPage from "./UserSearch/UserSearchPage";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [authUserID, setAuthUserID] = useState('');
    const ctx = {
        currentUser,
        authUserID,
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setCurrentUser(authUser);
                setAuthUserID(authUser.uid);
            } else {
                setCurrentUser(null);
                setAuthUserID('');
            }
        });

        return () => {
            unsubscribe()
        };
    }, [currentUser]);

    return (
        <div className="app-wrapper">

            <AppCtxProvider value={ctx}>

                <Header/>

                {
                    currentUser && (<Dashboard/>)
                }

                <Switch>
                    <Route path="/" exact component={Homepage}/>
                    <Route path="/my-publications" component={MyPublications}/>
                    <Route path="/my-favourites" component={MyFavourites}/>
                    <Route path="/my-profile" component={MyProfile}/>
                    <Route path="/users/:id" component={UserProfile}/>
                    <Route path="/posts/:id" component={SinglePostPage}/>
                    <Route path="/search" component={UserSearchPage}/>
                    <Route path="/test" component={GenericGuestPage}/>
                </Switch>

            </AppCtxProvider>

        </div>
    );
}

export default App;
