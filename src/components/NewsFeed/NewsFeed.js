import Post from "../Post/Post";
import {useEffect, useState} from "react";
import {db} from "../../firebase";

const Newsfeed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        })
    }, [])

    return (
        <div className="newsfeed-container">
            {
                posts.map(p => <Post key={p.id} post={p.post} />)
            }
        </div>
    );
}

export default Newsfeed;