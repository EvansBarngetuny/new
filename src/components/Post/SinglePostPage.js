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
        getPostById(postID)
            .then(res => {
                setPost(res.data())
                setIsLoading(false)
            })
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

            <style jsx={true}>{`
              .single-post-page-container {
                margin-left: 16rem;
              }

              .single-post-page-btn-wrapper {
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