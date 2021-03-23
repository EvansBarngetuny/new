import './App.css';
import './components/Header/Header.css';
import './components/Post/Post.css';
import Header from "./components/Header/Header";
import Post from "./components/Post/Post";

function App() {
  return (
    <div className="app-wrapper">

      <Header />

      <Post />

      <Post />

    </div>
  );
}

export default App;
