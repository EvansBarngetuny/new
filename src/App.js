import './App.css';
import Header from "./components/Header/Header";
import {useEffect, useState} from "react";
import {auth} from "./firebase";
import {AppCtxProvider} from "./context/AppCtx";
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";

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

            <Homepage />

            <Dashboard />

            </AppCtxProvider>


        </div>
    );
}

export default App;
