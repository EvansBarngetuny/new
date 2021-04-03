import {Link} from "@material-ui/core";
import {getPostsByOwner} from "../../utils/data";
import FilteredNewsfeed from "../NewsFeed/FilteredNewsFeed";
import {useContext} from "react";
import AppCtx from "../../context/AppCtx";
import {Redirect} from "react-router-dom";

const UserProfile = ({match}) => {
    const userId = match.params.id;
    const {authUserID} = useContext(AppCtx);
    let isSameUser = userId === authUserID;

    if (isSameUser) {
        return <Redirect to="/my-profile" />
    }

    return (
        <div className="user-profile-container">
            <h1>User profile page</h1>
            <section className="my-profile-favourite-posts">
                <h3>User's latest publications</h3>
                <FilteredNewsfeed
                    fetchData={() => getPostsByOwner(userId, 6)}
                />
                <p><Link to="/my-publications">See all publications by this user</Link></p>
            </section>

            <style jsx={true}>{`
              .user-profile-container {
                margin-left: 16rem;
              }

            `}
            </style>
        </div>
    );
}

export default UserProfile;