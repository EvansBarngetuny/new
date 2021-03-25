import CreateNewPostHandler from "./CreateNewPostHandler/CreateNewPostHandler";
import {Button} from "@material-ui/core";
import {useState} from "react";

const CreateNewPost = ({username}) => {
    const [isOpen, setIsOpen] = useState(false);
    const btnText = isOpen ? 'Cancel' : 'Create new post';

    return (
        <div className="image-uploader-container">

            {
                isOpen ? (<CreateNewPostHandler username={username}/>) : null
            }

            <article className="create-post-btn">
                <Button onClick={() => setIsOpen(!isOpen)}>{btnText}</Button>
            </article>

            <style jsx>{`
              .image-uploader-container {
              box-sizing: border-box;
                display: flex;
                flex-flow: column wrap;
                margin: 10px auto;
                justify-content: center;
                border: 1px solid lightgray;
                max-width: 600px;
                padding: 10px 20px;
                text-align: center;
                background: white;
              }
            `}
            </style>
        </div>
    );
}

export default CreateNewPost;