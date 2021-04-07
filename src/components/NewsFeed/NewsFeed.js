import Post from "../Post/Post";
import {useEffect, useState} from "react";
import {db} from "../../firebase";
import Spinner from "../../common/components/Spinner/Spinner";
import {parseDataOnSnapshot} from "../../utils/data";

const Newsfeed = ({fetchData}) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // listens for a change in the db and adds the new entries to the state each time it's fired
        parseDataOnSnapshot(fetchData, setIsLoading, setPosts);

    }, [fetchData]);


    return (
        <div className="newsfeed-container">
            {
                isLoading && <Spinner />
            }
            {
                posts.map(p => <Post key={p.id} postID={p.id} post={p.post}/>)
            }
        </div>
    );
}

export default Newsfeed;