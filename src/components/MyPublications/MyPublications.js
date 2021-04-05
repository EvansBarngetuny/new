import {useContext, useEffect, useState} from "react";
import {Redirect} from 'react-router-dom';
import {db} from "../../firebase";
import Post from "../Post/Post";
import AppCtx from "../../context/AppCtx";
import Spinner from "../../common/components/Spinner/Spinner";
import GenericGuestPage from "../GenericGuestPage/GenericGuestPage";

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
                setIsLoading(false)
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                })));
            });

        return () => {
            unsubscribe()
        }

    }, [userID]);

    if (!currentUser) {
        return GenericGuestPage();
    }

    return (
        <div className="my-publications-container">
            <h1>This is a list of all the posts you've published</h1>

            {
                isLoading && <Spinner/>
            }

            {
                posts.length > 0
                    ? (posts.map(p => <Post key={p.id} postID={p.id} post={p.post}/>))
                    : (<h1>No publications yet</h1>)
            }

            <style jsx="true">{`
              .my-publications-container {
                margin-left: 16rem;
              }

            `}
            </style>

        </div>
    );
}

export default MyPublications;