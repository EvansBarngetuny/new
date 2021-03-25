import {Button, Input} from "@material-ui/core";
import {useState} from "react";
import {auth} from "../../firebase";

const LoginForm = ({callback}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const closeModal = callback.bind(null, false);

    function login(ev) {
        ev.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                closeModal();
            })
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
                max-width: 400px;
              }
            `}
            </style>
        </form>
    );
}

export default LoginForm;