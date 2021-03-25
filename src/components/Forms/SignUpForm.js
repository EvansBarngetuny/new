import {Button, Input} from "@material-ui/core";
import {useState} from "react";
import {auth} from "../../firebase";

const SignUpForm = ({callback}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const closeModal = callback.bind(null, false);

    function signUp(ev) {
        ev.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                closeModal();
                return authUser.user.updateProfile({
                    displayName: username
                });
            })
            .catch(error => alert(error.message));

    }

    return(
        <form onSubmit={signUp} className="sign-in-form">
            <h5>To create an account, please, fill in all fields</h5>
            <Input
                type="text"
                placeholder="username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
            />
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
            <Button type="submit" >Sign Up</Button>

            <style jsx>{`
              .sign-in-form {
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

export default SignUpForm;