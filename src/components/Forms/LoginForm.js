import {Button, Input} from "@material-ui/core";
import {useEffect, useState} from "react";
import {auth} from "../../firebase";

const LoginForm = ({callback}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe()
        };
    }, [user, username]);

    function login(ev) {
        ev.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then(() => callback(false))
            .catch(err => {
                console.log(err)
                alert(err.message)
            });

    }

    return(
        <form onSubmit={login} className="login-form">
            <h5>Please fill in your credentials to login</h5>
            <Input
                type="text"
                placeholder="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" >Login</Button>

            <style jsx>{`
              .login-form {
                display: flex;
                flex-flow: column wrap;
                margin: 10px auto;
                align-items: center;
                justify-content: center;
                max-width: 350px;
              }
            `}
            </style>
        </form>
    );
}

export default LoginForm;