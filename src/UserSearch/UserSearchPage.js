import {useContext, useEffect, useState} from "react";
import {db} from "../firebase";
import Spinner from "../common/components/Spinner/Spinner";
import AppCtx from "../context/AppCtx";
import UserSearchPageResultList from "./UserSearchPageResultList/UserSearchPageResultList";

const UserSearchPage = ({location}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState([]);
    const {currentUser} = useContext(AppCtx);
    const query = location.search.split('=')[1];

    useEffect(() => {
        setIsLoading(true);
        db.collection('users')
            .where('username', '==', query)
            .get()
            .then(res => {
                const mappedUsers = res.docs
                    .map(userObj => (
                        {
                            id: userObj.id,
                            username: userObj.data().username
                        }
                    ));

                setIsLoading(false)
                setResult(mappedUsers);
            });
    }, [query]);

    return (
        <div className={"search-page-container" + (currentUser ? ' logged-user' : '')}>
            <h1>Search Result</h1>

            {
                isLoading && (<Spinner/>)
            }

            {
                result.length > 0
                    ? (<UserSearchPageResultList result={result} searchQuery={query}/>)
                    : (<h3>No users matching "{query}" were found</h3>)
            }

            <p className="search-page-disclaimer">*only exact matches are being shown</p>
            <style jsx="true">{`
              .search-page-container {
                background: white;
                padding: 20px;
                border: 1px solid lightgray;
                border-radius: 5px;
                margin-top: 5px;
              }
              .search-page-disclaimer {
                margin: 0;
              }

            `}
            </style>
        </div>
    );
}

export default UserSearchPage;