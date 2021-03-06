import {Button, Input} from "@material-ui/core";
import {useContext, useState} from "react";
import {db, storage} from "../../../firebase";
import firebase from "firebase";
import AppCtx from "../../../context/AppCtx";
import Spinner from "../../../common/components/Spinner/Spinner";

const CreateNewPostHandler = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const ctx = useContext(AppCtx);

    const {authUser, closeModal} = useContext(AppCtx);

    const onChangeHandler = (ev) => {
        if (ev.target.files[0]) {
            setImage(ev.target.files[0])
        }
    };

    const handleUpload = () => {
        if (!image) {
            return alert('Please select an image!');
        } else if (!image.type.includes('image/')) {
            return alert('Only files of type image are allowed!');
        }

        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot => {
                // progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            }),
            (error => {
                // error function
                console.log(error);
                alert(error.message);
            }),
            () => {
                // complete function
                setIsLoading(true);
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // get the image url and create new post in the DB
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            content: caption,
                            imageURL: url,
                            postedBy: authUser.displayName,
                            ownerID: authUser.uid,
                            likes: [],
                            inFavourites: []
                        })
                            .then(() => {
                                setIsLoading(false)
                                ctx.closeModal()
                            })
                            .catch(err => console.log(err));

                        // reset the values
                        setProgress(0);
                        setCaption('');
                        setImage(null);

                        // close the window
                    });
            }
        )
    };

    return (
        <>
            {
                isLoading
                    ? <Spinner/>
                    : <>
                        <h3>Create a new post</h3>
                        <label htmlFor="progressBar">Progress:</label>
                        <progress id="progressBar" value={progress} max="100"/>
                        <label htmlFor="file-upload">Please select an image to upload</label>
                        <label htmlFor="file-upload" className="custom-file-upload">SELECT AN IMAGE</label>
                        <span>{image ? image.name : ''}</span>
                        <Input id="file-upload" type="file" onChange={onChangeHandler}/>
                        <label htmlFor="caption-input">Please enter a caption</label>
                        <Input id="caption-input"
                               type="text" placeholder="Your caption..."
                               value={caption} onChange={ev => setCaption(ev.target.value)}
                        />
                        <Button onClick={handleUpload}>Upload</Button>
                        <Button onClick={closeModal}>Cancel</Button>

                        <style jsx="true">{`
                          .image-uploader-container input {
                            margin: 8px auto;
                            padding: 5px;
                          }

                          .image-uploader-container label {
                            margin: 15px 0 5px 0;
                          }

                          #progressBar {
                            width: 100%;
                          }

                          #file-upload {
                            display: none;
                          }

                          .custom-file-upload {
                            padding: 6px 12px;
                          }

                          .custom-file-upload:hover {
                            background: #f3f3f3;
                            cursor: pointer;
                          }
                        `}
                        </style>
                    </>
            }
        </>
    );
}

export default CreateNewPostHandler;