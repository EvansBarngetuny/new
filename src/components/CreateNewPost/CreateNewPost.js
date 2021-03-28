import CreateNewPostHandler from "./CreateNewPostHandler/CreateNewPostHandler";

const CreateNewPost = () => {

    return (
        <div className="image-uploader-container">

            <CreateNewPostHandler />

            <style jsx>{`
              .image-uploader-container {
                box-sizing: border-box;
                display: flex;
                flex-flow: column wrap;
                margin: 10px auto;
                justify-content: center;
                border: 1px solid lightgray;
                border-radius: 5px;
                max-width: 600px;
                width: 100%;
                padding: 10px 20px;
                text-align: center;
                background: white;
                box-shadow: 0 0 5px 0.5px #0000003b;
              }
            `}
            </style>
        </div>
    );
}

export default CreateNewPost;