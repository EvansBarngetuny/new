import {useContext, useEffect, useState} from "react";
import {Redirect} from 'react-router-dom';
import {db} from "../../firebase";
import Post from "../Post/Post";
import AppCtx from "../../context/AppCtx";
import Spinner from "../../common/components/Spinner/Spinner";

const MyPublications = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {currentUser} = useContext(AppCtx);

    const userID = currentUser ? currentUser.uid : '';

    useEffect(() => {
        // listens for a change in the db and adds the new entries to the state each time it's fired
        setIsLoading(true)
        const unsubscribe = db.collection('posts')
            .where('ownerID', '==', userID)
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                })));
            });

        return (
            unsubscribe
        )
    }, [userID]);

    useEffect(() => {
        if (posts.length > 0) {
            setTimeout(() => {
                setIsLoading(false)
                console.log(posts.length * 50)
            }, posts.length * 50);
        }

    }, [posts])

    return (
        <div className="my-publications-container">
            {
                isLoading && <Spinner />
            }

            {
                currentUser
                    ? (posts.map(p => <Post key={p.id} postID={p.id} post={p.post}/>))
                    : (<Redirect to="/"/>)
            }

            <style jsx>{`
              .my-publications-container {
                margin-left: 16rem;
              }

            `}
            </style>

        </div>
    );
}

export default MyPublications;