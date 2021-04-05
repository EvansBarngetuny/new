import {Button, Input} from "@material-ui/core";
import {useState} from "react";
import {auth} from "../../firebase";
import Spinner from "../../common/components/Spinner/Spinner";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function login(ev) {
        ev.preventDefault();

        if (!email || !password) {
            return alert('All fields are required!');
        }

        setIsLoading(true)

        auth.signInWithEmailAndPassword(email, password)
            .then(() => setIsLoading(false))
            .catch(err => alert(err.message))
    }

    return (
        <div>
            {
                isLoading
                    ? <Spinner/>
                    : <form onSubmit={login} className="login-form">
                        <img src="/react-a-gram-logo.webp" className="nav-logo-image" alt="logo"/>
                        <h5>Please enter your credentials to login</h5>
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

                        <style jsx>{`
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
                        `}
                        </style>
                    </form>
            }
        </div>

    );
}

export default LoginForm;