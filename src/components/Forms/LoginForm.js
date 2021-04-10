import {Button, Input} from "@material-ui/core";
import {useState} from "react";
import Spinner from "../../common/components/Spinner/Spinner";
import {loginUser} from "../../utils/data";
import {useHistory} from "react-router-dom";

const LoginForm = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    function login(ev) {
        ev.preventDefault();

        if (!email || !password) {
            setNotificationMessage('All fields are required');
            return;
        }

        setIsLoading(true)

        loginUser(email, password)
            .then(() => {
                setIsLoading(false);
                history.push('/');
            })
            .catch(error => {
                setIsLoading(false);
                if (error.code === 'auth/user-not-found' ||
                    error.code === 'auth/wrong-password') {
                    setNotificationMessage('Wrong email or password')
                } else if (error.code === 'auth/invalid-email') {
                    setNotificationMessage('This email address is invalid');
                } else if (error.code === 'auth/internal-error') {
                    setNotificationMessage('The server encountered an unexpected error while trying to process the request. Please try again later');
                }else {
                    console.error(error.message);
                }
            });
    }

    return (
        <div>
            {
                isLoading
                    ? <Spinner/>
                    : <form onSubmit={login} className="login-form">
                        <img src="/react-a-gram-logo.webp" className="nav-logo-image" alt="logo"/>
                        <h5>Please enter your credentials to login</h5>
                        <span className="login-form-notification">{notificationMessage}</span>
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
                        <Button type="submit">Login</Button>

                        <style jsx="true">{`
                          .login-form {
                            display: flex;
                            flex-flow: column wrap;
                            margin: 10px auto;
                            align-items: center;
                            justify-content: center;
                            max-width: 400px;
                          }

                          .login-form input {
                            margin: 5px 0 0 0;
                          }

                          .login-form label,
                          .login-form button {
                            margin-top: 20px;
                          }
                          
                          .login-form-notification  {
                            color: red;
                          }
                        `}
                        </style>
                    </form>
            }
        </div>

    );
}

export default LoginForm;