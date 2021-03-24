import './App.css';
import Header from "./components/Header/Header";
import Newsfeed from "./components/NewsFeed/NewsFeed";

function App() {
    return (
        <div className="app-wrapper">

            <Header/>

            <Newsfeed />

        </div>
    );
}

export default App;
