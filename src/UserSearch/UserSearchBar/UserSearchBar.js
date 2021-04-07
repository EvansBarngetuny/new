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
            <form onSubmit={onSubmitSearchHandler} action="">
                <Input
                    className="search-bar-input"
                    type="text"
                    placeholder="Enter an username..."
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
                border: 1px solid #e3e3e3;
                border-radius: 50px;
                padding: 5px 25px;
              }
              
              .search-bar-input {
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