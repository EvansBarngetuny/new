import {useEffect, useState} from "react";
import {db} from "../firebase";
import {Link} from "react-router-dom";
import Spinner from "../common/components/Spinner/Spinner";

const UserSearchPage = ({location}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState([]);
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
        <div className="search-page-container">
            <h1>Search Page</h1>

            {
                isLoading && (<Spinner />)
            }

            {
                result.length > 0
                    ? (result.map(user => <Link key={user.id} to={'/users/' + user.id}>{user.username}</Link>))
                    : (<h2>No results were found</h2>)
            }

            <style jsx={true}>{`
              .search-page-container {
                margin-left: 16rem;
              }

            `}
            </style>
        </div>
    );
}

export default UserSearchPage;