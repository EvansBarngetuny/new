import './App.css';
import Header from "./components/Header/Header";
import Newsfeed from "./components/NewsFeed/NewsFeed";
import {useState} from "react";

function App() {
    const [posts, setPosts] = useState([
        {
            id: 'assdf-jrijr',
            username: 'jsmemes',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, porro!',
            imageURL: 'https://miro.medium.com/max/1404/0*ZeJO8KPaD-tfK2oK.jpeg',
            profilePic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png'
        },
        {
            id: 'assdf-ncort',
            username: 'reactmemes',
            caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            imageURL: 'https://miro.medium.com/max/1100/1*f-dKZBylX_qzaloi2AC0dg.jpeg'
        }
    ]);

  return (
    <div className="app-wrapper">

      <Header />

      <Newsfeed posts={posts}/>

    </div>
  );
}

export default App;
