import Spinner from "../../common/components/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AppCtx from "../../context/AppCtx";
import {db} from "../../firebase";
import Post from "../Post/Post";
import GenericGuestPage from "../GenericGuestPage/GenericGuestPage";

const MyFavourites = () => {
    const [favouritePosts, setFavouritePosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {currentUser} = useContext(AppCtx);
    const userID = currentUser ? currentUser.uid : '';

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = db.collection('posts')
            .where('inFavourites', 'array-contains', userID)
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot => {
                setIsLoading(false);
                setFavouritePosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                })));

            }));

        return () => {
            unsubscribe()
        }

    }, [userID]);

    if (!currentUser) {
        return GenericGuestPage();
    }

    return (
        <div className="my-favourites-container">
            <h1>Here are all the posts you've saved to favourites</h1>

            {
                isLoading && <Spinner/>
            }

            {
                favouritePosts.length > 0
                    ? (favouritePosts.map(p => <Post key={p.id} postID={p.id} post={p.post}/>))
                    : (<div className="no-posts-container"><h1>No publications yet</h1></div>)

            }


            <style jsx={true}>{`
              .my-favourites-container {
                margin-left: 16rem;
              }

              .no-posts-container {
                text-align: center;
              }

            `}
            </style>
        </div>
    );
}

export default MyFavourites;