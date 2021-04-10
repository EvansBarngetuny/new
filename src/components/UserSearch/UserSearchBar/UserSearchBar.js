import {Button, Input} from "@material-ui/core";
import {useState} from "react";
import {useHistory} from "react-router-dom";

const UserSearchBar = () => {
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState('');

    const onSubmitSearchHandler = (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            return;
        }

        const query = searchQuery;
        setSearchQuery('');

        history.push('/search?query=' + query);
    }


    return (
        <article className="search-bar-container">
            <img className="search-bar-icon" src="/search-icon.svg" alt="search"/>
            <form onSubmit={onSubmitSearchHandler} action="">
                <Input
                    className="search-bar-input"
                    type="text"
                    placeholder="Enter username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    className="search-bar-button"
                    type="submit"
                >
                    Search
                </Button>
            </form>

            <style jsx="true">{`
              .search-bar-container {
                position: relative;
                border: 1px solid lightgray;
                border-radius: 50px;
                padding: 5px 20px 5px 50px;
                background: #F4F4F4;
              }

              .search-bar-icon {
                position: absolute;
                left: 18px;
                width: 20px;
                height: 20px;
                top: 15px;
              }

              .search-bar-input {
                padding-left: 5px;
                margin-right: 5px;
              }

              .search-bar-button {
                margin-left: 5px;
              }

            `}
            </style>
        </article>
    );
}

export default UserSearchBar;