import MainNewsFeed from "../NewsFeed/MainNewsFeed";
import AppCtx from "../../context/AppCtx";
import {Component} from "react";
import {getAllPosts} from "../../utils/data";
import GenericGuestPage from "../GenericGuestPage/GenericGuestPage";

class Homepage extends Component {
    static contextType = AppCtx;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'homepage-container' + (this.context.authUser ? ' logged-user' : '')}>

                {
                    !this.context.authUser && (<GenericGuestPage />)
                }

                <MainNewsFeed fetchData={getAllPosts}/>

            </div>
        );
}
}

export default Homepage;