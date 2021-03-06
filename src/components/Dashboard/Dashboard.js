import Avatar from "@material-ui/core/Avatar";
import {NavLink} from "react-router-dom";
import ModalContainer from "../Modals/ModalContainer/ModalContainer";
import CreateNewPost from "../CreateNewPost/CreateNewPost";
import {useContext, useEffect, useState} from "react";
import AppCtx from "../../context/AppCtx";
import {db} from "../../firebase";

const Dashboard = () => {
    const [profilePic, setProfilePic] = useState('');
    const {authUserID} = useContext(AppCtx)

    useEffect(() => {
        //setIsLoading(true);
        if (!authUserID) {
            return;
        }

        const unsubscribe = db.collection('users')
            .doc(authUserID)
            .onSnapshot((snapshot => {
                //setIsLoading(false);
                if (authUserID && snapshot.data()) {
                    const {profilePic} = snapshot.data();
                    setProfilePic(profilePic)
                }
            }));

        return () => {
            unsubscribe()
        }

    }, [authUserID]);

    return (
        <aside className="side-dashboard">

            <article className="dashboard-header">
                <Avatar
                    className="dashboard-avatar"
                    alt=""
                    src={profilePic}
                >
                </Avatar>

                <NavLink className="dashboard-header-link" to="/my-profile">MY PROFILE</NavLink>
            </article>

            <article className="dashboard-body">
                <ul className="dashboard-body-nav-ul">
                    <li>
                        <ModalContainer btnText="Create new post" >
                            <CreateNewPost />
                        </ModalContainer>
                    </li>
                    <li>
                        <NavLink className="dashboard-body-link" to="/" exact >HOME</NavLink>
                    </li>
                    <li>
                        <NavLink className="dashboard-body-link" to="/my-publications">MY PUBLICATIONS</NavLink>
                    </li>
                    <li>
                        <NavLink className="dashboard-body-link" to="/my-favourites">MY FAVOURITES</NavLink>
                    </li>
                    <li>
                        <NavLink className="dashboard-body-link" to="/my-liked-posts">POST I'VE LIKED</NavLink>
                    </li>
                </ul>
            </article>

            <style jsx="true">{`
              .side-dashboard {
                background: white;
                width: 250px;
                height: 500px;
                border-right: 1px solid lightgray;
                border-left: 1px solid lightgray;
                border-bottom: 1px solid lightgray;
                position: fixed;
                top: 70px;
                margin-left: 0;
              }

              .dashboard-header {
                border-bottom: 1px solid lightgray;
                padding: 15px;
                text-align: center;

              }

              .dashboard-avatar {
                height: 60px;
                width: 60px;
                margin: 0 auto 10px auto;
              }

              .dashboard-body {
                padding: 10px;
              }

              .dashboard-body-nav-ul {
                margin: 0;
                padding: 0;
              }

              .dashboard-body-nav-ul li {
                list-style: none;
                margin: 5px 0;
                padding-left: 5px;
              }

              .active {
                background: #ececec;
              }

              .side-dashboard a {
                text-decoration: none;
                margin: 10px 0;
                color: rgba(0, 0, 0, 0.87);
                font-size: 14px;
                font-weight: 500;
                padding: 6px 8px;
                border-radius: 3px;
              }

              .side-dashboard a:hover {
                background: #f5f5f5;
              }

            `}
            </style>
        </aside>
    );
}

export default Dashboard;