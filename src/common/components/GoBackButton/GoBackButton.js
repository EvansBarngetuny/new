import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";

const GoBackButton = () => {
    const history = useHistory()

    const goBack = () => {
        history.goBack()
    }

    return (
        <Button type="button" onClick={goBack}>
            &#60; Go back
        </Button>
    );
}

export default GoBackButton;