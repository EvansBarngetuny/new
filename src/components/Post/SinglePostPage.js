import Post from "./Post";
import {useEffect, useState} from "react";
import {getPostById} from "../../utils/data";
import Spinner from "../../common/components/Spinner/Spinner";
import GoBackButton from "../../common/components/GoBackButton/GoBackButton";

const SinglePostPage = ({match}) => {
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
    }, []);

    return (
        <section className="single-post-page-container">
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
                margin-left: 16rem;
                position: relative;
              }

              .single-post-page-btn-wrapper {
                position: absolute;
                margin-top: 5px;
                text-align: center;
                width: 100px;
                background: white;
                border-radius: 5px;
                border: 1px solid lightgray;
              }

            `}
            </style>
        </section>
    );
}

export default SinglePostPage;