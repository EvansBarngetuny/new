import ModalContainer from "../Modals/ModalContainer/ModalContainer";
import SignUpForm from "../Forms/SignUpForm";
import LoginForm from "../Forms/LoginForm";
import LogoContainer from "../../common/components/LogoContainer/LogoContainer";
import {useContext} from "react";
import AppCtx from "../../context/AppCtx";

const GenericGuestPage = (props) => {
    const {setAuthUserName} = useContext(AppCtx);

    return (
        <section className="generic-guest-page-container">
            <LogoContainer
                src="/react-a-gram-logo.webp"
                alt="logo"
            />
            <article>
                <h4>You need to be logged in to see the full content of this page</h4>
                <p>
                    To see all publications, create new posts,
                    like and comment you need to be a registered user.
                </p>
                <p>
                    Please log in to your account or sign up to create a new one.
                </p>
            </article>
            <article>
                <ModalContainer btnText="Sign Up">
                    <SignUpForm onSuccessfulSignUp={setAuthUserName}/>
                </ModalContainer>

                <ModalContainer btnText="Login">
                    <LoginForm/>
                </ModalContainer>
            </article>

            <style jsx="true">{`
              .generic-guest-page-container {
                text-align: center;
                background: white;
                max-width: 800px;
                margin: 20px auto;
                border: 1px solid lightgray;
                border-radius: 5px;
                padding: 40px 20px;
                box-shadow: 0 0 5px 0.5px #0000003b;
              }

            `}
            </style>
        </section>
    );
}

export default GenericGuestPage;