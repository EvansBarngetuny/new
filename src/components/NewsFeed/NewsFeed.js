import Post from "../Post/Post";
import {useEffect, useState} from "react";
import {db} from "../../firebase";

const Newsfeed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // listens for a change in the db and adds the new entries to the state each time it's fired
        const unsubscribe = db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                })));
            });

        return(
            unsubscribe
        )
    }, []);

    return (
        <div className="newsfeed-container">
            {
                posts.map(p => <Post key={p.id} postID={p.id} post={p.post}/>)
            }
        </div>
    );
}

export default Newsfeed;