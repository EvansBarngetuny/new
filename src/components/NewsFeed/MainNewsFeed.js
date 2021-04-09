import Post from "../Post/Post";
import {useContext, useEffect, useState} from "react";
import Spinner from "../../common/components/Spinner/Spinner";
import {parseDataOnSnapshot} from "../../utils/data";
import AppCtx from "../../context/AppCtx";

const MainNewsFeed = ({fetchData, noPostsMsg}) => {
    const {authUser} = useContext(AppCtx);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // listens for a change in the db and adds the new entries to the state each time it's fired
        parseDataOnSnapshot(fetchData, setIsLoading, setPosts);

    }, [authUser]);


    return (
        <div className="newsfeed-container">
            {
                isLoading && <Spinner/>
            }

            {
                posts.length > 0
                    ? (posts.map(p => <Post key={p.id} postID={p.id} post={p.post}/>))
                    : (
                        <div className="no-posts-container">
                            <h2 className="no-posts-header">{noPostsMsg ? noPostsMsg : 'No posts yet...'}</h2>
                        </div>
                    )

            }

            <style jsx="true">{`
              .no-posts-container {
                text-align: center;
              }

              .no-posts-container {
                background: white;
                border: 1px solid lightgray;
                border-radius: 5px;
                padding: 30px 20px;
                max-width: 400px;
                margin: 0 auto;
                box-shadow: 0 0 5px 0.5px #0000003b;
              }

              .no-posts-header {
                color: #373737;
              }

            `}
            </style>
        </div>
    );
}

export default MainNewsFeed;