import {useContext, useEffect, useState} from "react";
import AppCtx from "../../../context/AppCtx";
import GenericGuestPage from "../../GenericGuestPage/GenericGuestPage";
import MainNewsFeed from "../MainNewsFeed";
import {getPostsByOwner, getUserDetails} from "../../../utils/data";
import MyPublications from "./MyPublications";

const UserPublications = ({match}) => {
    const [username, setUsername] = useState('');
    const {authUser, authUserID} = useContext(AppCtx);
    const userID = match.params.id;

    useEffect(() => {
        const unsubscribe = getUserDetails(userID)
            .onSnapshot(snapshot => {
                setUsername(snapshot.data().username);
            })
    },[userID])

    if (!authUser) {
        return GenericGuestPage();
    }

    if (authUserID === userID) {
        return MyPublications();
    }

    return (
        <div className="user-publications-container">
            <h1 className="user-publication-header">
                All publications by {username ? <em>{username}</em> : 'this user'}
            </h1>

            <MainNewsFeed fetchData={() => getPostsByOwner(userID)} />

            <style jsx="true">{`
              .user-publications-container {
                margin-left: 16rem;
              }
              .user-publication-header {
                border-bottom: 1px solid lightgray;
                color: #393939;
              }
              
            `}
            </style>
        </div>
    );
}

export default UserPublications;