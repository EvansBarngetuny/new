import Spinner from "../../common/components/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AppCtx from "../../context/AppCtx";
import {db} from "../../firebase";
import Post from "../Post/Post";

const MyFavourites = () => {
    const [favouritePosts, setFavouritePosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {currentUser} = useContext(AppCtx);

    const userID = currentUser ? currentUser.uid : '';

   /* useEffect(() => {
        setIsLoading(true);
        const unsubscribe = db.collection('users')
            .doc(userID)
            .collection('favourites')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot => {
                setIsLoading(false);
                setFavouritePosts(snapshot.docs.map(doc => ({
                    postID: doc.data().postID
                })));

            }));

        return () => {
            unsubscribe()
        }

    }, [userID]);*/

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

    /*useEffect(() => {
        favouritePosts.forEach(fav => {
            db.collection('posts')
                .doc(fav.postID)
                .get()
                .then(res => setPosts(prevState => {
                    const post = {
                        id: res.id,
                        post: res.data()
                    }
                    return [...prevState, post]
                }))
        })

    }, [favouritePosts])*/


    return (
        <div className="my-favourites-container">
            <h1>Here are all the posts you've saved to favourites</h1>

            {
                isLoading && <Spinner />
            }

            {
                currentUser
                    ? favouritePosts.length > 0
                        ?(favouritePosts.map(p => <Post key={p.id} postID={p.id} post={p.post}/>))
                        : (<div className="no-posts-container"><h1>No publications yet</h1></div>)
                    : (<Redirect to="/"/>)
            }

            {/*{
                currentUser
                    ? (<div><h1>No favourite posts</h1></div>)
                    : (<Redirect to="/"/>)
            }*/}

            <style jsx>{`
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