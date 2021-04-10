import Post from "../../Post/Post";
import {useContext, useEffect, useState} from "react";
import {getPostById} from "../../../utils/data";
import Spinner from "../../../common/components/Spinner/Spinner";
import GoBackButton from "../../../common/components/GoBackButton/GoBackButton";
import AppCtx from "../../../context/AppCtx";

const SinglePostPage = ({match}) => {
    const {authUser} = useContext(AppCtx);
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const postID = match.params.id;

    useEffect(() => {
        const unsubscribe = getPostById(postID)
            .onSnapshot(snapshot => {
                setPost(snapshot.data())
                setIsLoading(false)
            })

        return () => {
            unsubscribe();
        }
    }, [postID]);

    return (
        <section className={"single-post-page-container" + (authUser ? ' logged-user' : '')}>
            <article className="single-post-page-btn-wrapper">
                <GoBackButton/>
            </article>
            {
                isLoading
                    ? (<Spinner/>)
                    : (<Post postID={postID} post={post}/>)
            }

            <style jsx="true">{`
              .single-post-page-container {
                position: relative;
              }

              .single-post-page-btn-wrapper {
                position: absolute;
                margin-top: 5px;
                text-align: center;
                width: 100px;
                
              }

            `}
            </style>
        </section>
    );
}

export default SinglePostPage;