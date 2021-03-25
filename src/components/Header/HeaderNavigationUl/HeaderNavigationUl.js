import AuthenticationModal from "../../Modals/AuthenticationModal/AuthenticationModal";
import {auth} from "../../../firebase";
import {Button} from "@material-ui/core";

function HeaderNavigationUl({currentUser}) {

    const onLogout = () => {
        auth.signOut()
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <ul className="app-header-nav-ul">
            {
                currentUser
                    ? (<>
                        <li className="header-nav-welcome-msg">Welcome, {currentUser.displayName}</li>
                        <li><Button onClick={onLogout}>Logout</Button></li>
                    </>)
                    : (<>
                        <li><AuthenticationModal formType="signUp" btnText="Sign Up"/></li>
                        <li><AuthenticationModal formType="login" btnText="Login"/></li>
                    </>)
            }

            <style jsx>{`
              .app-header-nav-ul {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                align-items: center;
              }

              .app-header-nav-ul {
                list-style: none;
              }

              .header-nav-welcome-msg {
                font-family: Roboto, sans-serif;
                margin-right: 15px;
              }
            `}
            </style>
        </ul>
    );
}

export default HeaderNavigationUl;