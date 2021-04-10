import ModalContainer from "../../Modals/ModalContainer/ModalContainer";
import {auth} from "../../../firebase";
import {Button} from "@material-ui/core";
import {useContext, useState} from "react";
import AppCtx from "../../../context/AppCtx";
import SignUpForm from "../../Forms/SignUpForm";
import LoginForm from "../../Forms/LoginForm";

function HeaderNavigation() {
    const {authUser, authUserName} = useContext(AppCtx);
    const [username, setUsername] = useState(authUserName);

    const onLogout = () => {
        auth.signOut()
            .catch(err => console.log(err))
    }

    return (
        <ul className="app-header-nav-ul">
            {
                authUser
                    ? (<>
                            <li className="header-nav-welcome-msg">Welcome, {authUser.displayName || username}</li>
                            <li><Button onClick={onLogout}>Logout</Button></li>
                        </>
                    )
                    : (<>
                            <li>
                                <ModalContainer btnText="Sign Up">
                                    <SignUpForm onSuccessfulSignUp={setUsername}/>
                                </ModalContainer>
                            </li>
                            <li>
                                <ModalContainer btnText="Login">
                                    <LoginForm/>
                                </ModalContainer>
                            </li>
                        </>
                    )
            }

            <style jsx="true">{`
              .app-header-nav-ul {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                align-items: center;
              }

              .app-header-nav-ul {
                padding: 0;
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

export default HeaderNavigation;