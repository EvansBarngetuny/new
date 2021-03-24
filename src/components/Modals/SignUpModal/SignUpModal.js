import {Button, makeStyles, Modal} from "@material-ui/core";
import {useState} from "react";
import SignUpForm from "../../Forms/SignUpForm";

const SignUpModal = () => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle());
    const [open, setOpen] = useState(false);

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <SignUpForm/>
                </div>
            < /Modal>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </>
    );
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        border: '1px solid lightgrey',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default SignUpModal;