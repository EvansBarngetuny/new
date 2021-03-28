import {Button, makeStyles, Modal} from "@material-ui/core";
import {useContext, useState} from "react";
import AppCtx from "../../../context/AppCtx";

const ModalContainer = (props) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle());
    const [open, setOpen] = useState(false);
    const ctx = useContext(AppCtx);
    ctx['closeModal'] = () => {
        setOpen(false)
    };

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>

                    {props.children}

                </div>
            < /Modal>
            <Button onClick={() => setOpen(true)}>{props.btnText}</Button>
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
        width: 500,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '7px',
        border: '1px solid lightgrey',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default ModalContainer;