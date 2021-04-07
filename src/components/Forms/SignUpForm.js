import {Button, Input} from "@material-ui/core";
import {useState} from "react";
import {auth, db} from "../../firebase";
import Spinner from "../../common/components/Spinner/Spinner";

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePass, setRePass] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function signUp(ev) {
        ev.preventDefault();

        if (!username.trim() || !email.trim() || !password || !rePass) {
            return alert('All fields are required!');
        }

        if (password !== rePass) {
            return alert('Passwords don\'t match!');
        }

        setIsLoading(true)

        let userID = '';
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                setIsLoading(false);
                userID = authUser.user.uid;
                return authUser.user.updateProfile({
                    displayName: username
                });
            })
            .then(() => {
                db.collection('users')
                    .doc(userID)
                    .set({username: username})
                    .then(() => console.log('success'))
            })
            .catch(error => alert(error.message));

    }

    return (
        <div>
            {
                isLoading
                ? <Spinner />
                : <form onSubmit={signUp} className="sign-in-form">
                        <img src="/react-a-gram-logo.webp" className="nav-logo-image" alt="logo"/>
                        <h5>To create an account, please, fill in all fields</h5>
                        <label htmlFor="">Username*</label>
                        <Input
                            type="text"
                            placeholder="Enter username..."
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                            placeholder="Enter confirm password..."
                            value={rePass}
                            required
                            onChange={(e) => setRePass(e.target.value)}
                        />
                        <Button type="submit">Sign Up</Button>

                        <style jsx={true}>{`
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
            `}
                        </style>
                    </form>
            }
        </div>
    );
}

export default SignUpForm;