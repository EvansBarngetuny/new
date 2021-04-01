import {useContext, useEffect, useState} from "react";
import {db} from "../../firebase";
import Spinner from "../../common/components/Spinner/Spinner";
import AppCtx from "../../context/AppCtx";
import GridPost from "../Post/GridPost";

const FilteredNewsfeed = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {currentUser} = useContext(AppCtx);

    useEffect(() => {
        // listens for a change in the db and adds the new entries to the state each time it's fired
        setIsLoading(true)
        const unsubscribe = db.collection('posts')
            .orderBy('timestamp', 'desc')
            .where('ownerID', '==', currentUser.uid)
            .limit(6)
            .onSnapshot(snapshot => {
                setIsLoading(false);
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                })));
            });


        return () => {
            unsubscribe()
        }

    }, []);


    return (
        <div className="filtered-newsfeed-container">
            {
                isLoading && <Spinner />
            }
            {
                posts.map(p => <GridPost key={p.id} postID={p.id} post={p.post}/>)
            }

            <style jsx="true">{`
              .filtered-newsfeed-container {
                display: flex;
                flex-flow: row wrap;
              }

            `}
            </style>
        </div>
    );
}

export default FilteredNewsfeed;