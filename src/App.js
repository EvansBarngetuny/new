import './App.css';
import Header from "./components/Header/Header";
import Newsfeed from "./components/NewsFeed/NewsFeed";
import CreateNewPost from "./components/CreateNewPost/CreateNewPost";

function App() {
    return (
        <div className="app-wrapper">

            <Header/>

            <CreateNewPost username="username"/>

            <Newsfeed />

        </div>
    );
}

export default App;
