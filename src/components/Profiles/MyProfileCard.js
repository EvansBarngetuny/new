import Avatar from "@material-ui/core/Avatar";
import {Button} from "@material-ui/core";
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
                        <article className="image-uploader-section">
                            <label htmlFor="progressBar">Progress:</label>
                            <progress id="progressBar" value={progress} max="100"/>
                            <input type="file" onChange={onChangeHandler}/>
                            <button onClick={handleUpload}>Upload</button>
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
                                value={updatedDescription}
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                            />
                            <button
                                onClick={() => editDescription(props.userID, updatedDescription, toggleEditSection)}
                            >
                                Update
                            </button>
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
                background: #FFF9D7;
              }

              .my-profile-card-section {
                text-align: center;
              }

              .image-uploader-section {
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
                border-radius: 5px;
                margin-top: 0;
                padding: 20px;
                background: #FCF6F5FF;
              }

              .my-profile-description-title,
              .my-profile-username {
                border-bottom: 1px solid #9d9d9d;
              }

            `}
            </style>
        </section>
    );
}

export default MyProfileCard;