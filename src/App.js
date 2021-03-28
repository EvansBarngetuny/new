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

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const ctx = {
        currentUser,
    }

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


            <AppCtxProvider value={ctx}>

                <Header/>

                {
                    currentUser && (<Dashboard/>)
                }

                <Switch>
                    <Route path="/" exact component={Homepage}/>
                    <Route path="/my-publications" component={MyPublications}/>
                    <Route path="/my-favourites" component={MyFavourites}/>
                    <Route path="/test">
                        <div style={{textAlign: "center"}}>
                            <h1>This is a test page</h1>
                        </div>
                    </Route>
                </Switch>

            </AppCtxProvider>

        </div>
    );
}

export default App;
