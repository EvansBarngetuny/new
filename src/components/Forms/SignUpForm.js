import {Button, Input} from "@material-ui/core";
import {useEffect, useState} from "react";
import {auth} from "../../firebase";

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser);
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe()
        };
    }, [user, username]);

    function signUp(ev) {
        ev.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                });
            })
            .catch(error => alert(error.message));
    }

    return(
        <form onSubmit={signUp} className="sign-in-form">
            <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="password"
                value={password}
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