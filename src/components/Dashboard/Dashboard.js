import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";

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

                <Link className="dashboard-header-link" to="/test">Your profile</Link>
            </article>

            <style jsx>{`
              .side-dashboard {
                background: white;
                width: 290px;
                height: 500px;
                border-right: 1px solid lightgray;
                border-left: 1px solid lightgray;
                border-bottom: 1px solid lightgray;
                position: fixed;
                top: 70px;
                margin-left: 0;
                text-align: center;
              }
              
              .dashboard-header {
                border-bottom: 1px solid lightgray;
                padding: 15px;
              }

              .dashboard-avatar {
                height: 60px;
                width: 60px;
                margin: 0 auto 10px auto;
              }

              .dashboard-header-link {
                text-align: center;
                text-decoration: none;
                color: rgba(0, 0, 0, 0.87);;
              }
            `}
            </style>
        </aside>
    );
}

export default Dashboard;