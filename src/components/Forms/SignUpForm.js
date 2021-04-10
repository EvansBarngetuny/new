import {Button, Input} from "@material-ui/core";
import {useState} from "react";
import Spinner from "../../common/components/Spinner/Spinner";
import {createNewEntryInUsersDB, getUsersByUsername, registerNewUser} from "../../utils/data";

const SignUpForm = ({onSuccessfulSignUp}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePass, setRePass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    function signUp(ev) {
        ev.preventDefault();

        if (!username.trim() || !email.trim() || !password || !rePass) {
            return setNotificationMessage('All fields are required');
        }

        if (username.length < 3) {
            return setNotificationMessage('Username must be at least 3 characters long');
        }

        if (isUsernameTaken) {
            return setNotificationMessage('Choose another username, please');
        }

        if (password.length < 6) {
            return setNotificationMessage('Password must be at least 6 characters long');
        }

        if (password !== rePass) {
            return setNotificationMessage('Passwords don\'t match');
        }

        setIsLoading(true)

        let userID = '';
        registerNewUser(email, password)
            .then((authUser) => {
                setIsLoading(false);
                userID = authUser.user.uid;
                return authUser.user.updateProfile({
                    displayName: username
                });
            })
            .then(() => {
                createNewEntryInUsersDB(userID, {username: username})
                    .then(() => onSuccessfulSignUp(username))
            })
            .catch(error => {
                setIsLoading(false);
                if (error.code === 'auth/email-already-in-use') {
                    setNotificationMessage('This email address is already in use by another user');
                } else if (error.code === 'auth/invalid-email') {
                    setNotificationMessage('This email address is invalid');
                } else if (error.code === 'auth/internal-error') {
                    setNotificationMessage('The server encountered an unexpected error while trying to process the request. Please try again later');
                } else {
                    console.error(error.message);
                }
            });
    }

    const checkIsUsernameTaken = () => {
        getUsersByUsername(username)
            .then(snapshot => {
                const isTaken = snapshot.docs.length !== 0;
                setIsUsernameTaken(isTaken);
                console.log(isTaken)
            })
            .catch(err => console.error(err.message));
    }

    return (
        <div>
            {
                isLoading
                    ? <Spinner/>
                    : <form onSubmit={signUp} className="sign-in-form">
                        <img src="/react-a-gram-logo.webp" className="nav-logo-image" alt="logo"/>
                        <h5>To create an account, please, fill in all fields</h5>
                        <span className="signup-form-notification">{notificationMessage}</span>
                        <label htmlFor="">Username*</label>
                        <Input
                            type="text"
                            placeholder="Enter username..."
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            onBlur={checkIsUsernameTaken}
                        />
                        {
                            isUsernameTaken &&
                            <span className="field-isTaken-notification">This username is already taken</span>
                        }
                        <label htmlFor="">Email*</label>
                        <Input
                            type="text"
                            placeholder="example@email.com"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="">Password*</label>
                        <Input
                            type="password"
                            placeholder="Enter password..."
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="">Confirm Password*</label>
                        <Input
                            type="password"
                            placeholder="Repeat password..."
                            value={rePass}
                            required
                            onChange={(e) => setRePass(e.target.value)}
                        />
                        <Button type="submit">Sign Up</Button>

                        <style jsx="true">{`
                          .sign-in-form {
                            display: flex;
                            flex-flow: column wrap;
                            margin: 10px auto;
                            align-items: center;
                            justify-content: center;
                            max-width: 400px;
                          }

                          .sign-in-form input {
                            margin: 5px 0 0 0;
                          }

                          .sign-in-form label,
                          .sign-in-form button {
                            margin-top: 20px;
                          }

                          .signup-form-notification,
                          .field-isTaken-notification {
                            color: red;
                            margin: 5px;
                          }
                        `}
                        </style>
                    </form>
            }
        </div>
    );
}

export default SignUpForm;