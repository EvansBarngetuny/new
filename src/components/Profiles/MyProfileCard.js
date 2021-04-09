import Avatar from "@material-ui/core/Avatar";
import {Button, Input} from "@material-ui/core";
import {editDescription} from "../../utils/data";
import {useEffect, useState} from "react";
import {db, storage} from "../../firebase";

const MyProfileCard = (props) => {
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isUploadPicOpen, setIsUploadPicOpen] = useState(false);
    const [isEditDescOpen, setIsEditDescOpen] = useState(false);

    useEffect(() => {
        setUpdatedDescription(props.description);
    }, [props.description]);

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
                //setIsLoading(true);
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // get the image url and create new post in the DB
                        db.collection('users')
                            .doc(props.userID)
                            .update({
                                profilePic: url
                            })
                            .then(() => {
                                setIsUploadPicOpen(false);
                            })
                            .catch(err => console.log(err));

                        // reset the values
                        setProgress(0);
                        setImage(null);

                        // close the window
                    });
            }
        )
    };

    const toggleEditSection = () => {
        setIsEditDescOpen(!isEditDescOpen);
    }

    return (
        <section className="my-profile-card-section">
            <article className="profile-avatar-container">
                <p className="my-profile-username"><strong>{props.username}</strong></p>
                <Avatar
                    className="my-profile-avatar"
                    alt={props.profilePic || ""}
                    src={props.profilePic || ""}
                >
                </Avatar>
                {
                    isUploadPicOpen && (
                        <article className="my-profile-image-uploader-container">
                            <label htmlFor="my-profile-progressBar">Progress:</label>
                            <progress id="my-profile-progressBar" value={progress} max="100"/>
                            <label htmlFor="my-profile-file-upload">Please select an image to upload</label>
                            <label htmlFor="my-profile-file-upload" className="my-profile-custom-file-upload">SELECT AN
                                                                                                              IMAGE</label>
                            <span>{image ? image.name : ''}</span>
                            <Input id="my-profile-file-upload" type="file" onChange={onChangeHandler}/>
                            <Button onClick={handleUpload}>Upload</Button>
                        </article>
                    )
                }
                <Button onClick={() => setIsUploadPicOpen(!isUploadPicOpen)}>
                    {
                        isUploadPicOpen ? 'Cancel' : 'Update profile pic'
                    }
                </Button>
            </article>

            <article className="profile-description-container">
                <h4 className="my-profile-description-title">Description</h4>
                <p className="profile-description-text">{props.description}</p>
                {
                    isEditDescOpen && (
                        <article className="edit-description-section">
                            <textarea
                                className="edit-description-textarea"
                                value={updatedDescription}
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                            />
                            <Button
                                onClick={() => editDescription(props.userID, updatedDescription, toggleEditSection)}
                            >
                                Update
                            </Button>
                        </article>
                    )
                }
                <Button onClick={toggleEditSection}>
                    {
                        isEditDescOpen ? 'Cancel' : 'Update description'
                    }
                </Button>
            </article>

            <style jsx="true">{`
              .my-profile-card-section {
                max-width: 400px;
                margin: 0 auto;
                display: flex;
                flex-flow: column wrap;
                justify-content: center;
                align-items: center;
                border: 1px solid lightgray;
                border-radius: 5px;
                padding: 10px 20px;
                background: white;
              }

              .my-profile-card-section {
                text-align: center;
              }

              .my-profile-image-uploader-container {
                display: flex;
                flex-flow: column wrap;
              }

              .my-profile-avatar {
                height: 130px;
                width: 130px;
                margin: 0 auto 20px auto;
              }

              .edit-description-section {
                display: flex;
                flex-flow: column wrap;
              }

              .profile-description-text {
                border: 1px solid lightgray;
                min-height: 20px;
                min-width: 180px;
                border-radius: 5px;
                margin-top: 0;
                padding: 20px;
                background: #F0F0F0;
              }

              .my-profile-description-title,
              .my-profile-username {
                border-bottom: 1px solid #9d9d9d;
              }
              
              .my-profile-image-uploader-container label {
                margin: 15px 0 5px 0;
              }
                          
              #my-profile-progressBar {
                width: 100%;
              }

              #my-profile-file-upload {
                display: none;
              }

              .my-profile-custom-file-upload {
                padding: 6px 12px;
              }

              .my-profile-custom-file-upload:hover {
                background: #f3f3f3;
                cursor: pointer;
              }
              
              .edit-description-textarea {
                font-family: Roboto, sans-serif;
                font-style: italic;
                font-size: 15px;
                min-height: 50px;
                width: 96%;
                margin: 0 auto;
                border: 1px solid lightgray;
                border-radius: 5px;
              }

            `}
            </style>
        </section>
    );
}

export default MyProfileCard;