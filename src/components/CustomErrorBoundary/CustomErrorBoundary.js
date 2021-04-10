import {logErrorToDB} from "../../utils/data";
import ErrorPage from "./ErrorPage/ErrorPage";

const {Component} = require("react");

class CustomErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        logErrorToDB(error, errorInfo)
            .then(() => {});
    }

    render() {
        if (this.state.hasError) {
            return <ErrorPage />;
        }

        return this.props.children;
    }
}

export default CustomErrorBoundary;