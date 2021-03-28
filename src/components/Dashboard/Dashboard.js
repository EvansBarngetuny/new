import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";
import ModalContainer from "../Modals/ModalContainer/ModalContainer";
import CreateNewPost from "../CreateNewPost/CreateNewPost";

const Dashboard = () => {

    return (
        <aside className="side-dashboard">

            <article className="dashboard-header">
                <Avatar
                    className="dashboard-avatar"
                    alt=""
                    src=""
                >
                </Avatar>

                <Link className="dashboard-header-link" to="/test">YOUR PROFILE</Link>
            </article>

            <article className="dashboard-body">
                <ul className="dashboard-body-nav-ul">
                    <li>
                        <ModalContainer btnText="Create new post" >
                            <CreateNewPost />
                        </ModalContainer>
                    </li>
                    <li>
                        <Link className="dashboard-body-link" to="/my-publications">MY PUBLICATIONS</Link>
                    </li>
                    <li>
                        <Link className="dashboard-body-link" to="/test">MY FAVOURITES</Link>
                    </li>
                </ul>
            </article>

            <style jsx>{`
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
              
              .dashboard-body-link {
              }

              .side-dashboard a {
                text-decoration: none;
                margin: 10px 0;
                color: rgba(0, 0, 0, 0.87);
                font-size: 14px;
                font-weight: 500;
                padding: 6px 8px;
              }

            `}
            </style>
        </aside>
    );
}

export default Dashboard;