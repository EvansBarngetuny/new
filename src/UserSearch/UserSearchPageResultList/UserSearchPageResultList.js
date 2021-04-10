import {Link} from "react-router-dom";

const UserSearchPageResultList = ({result, searchQuery}) => {
    return (
        <ul className="user-search-page-results">
            <p>Users that match your search parameters "{searchQuery}"</p>
            {
                result.map(user => (
                    <li key={user.id}>
                        <img className="user-icon" src="/user-icon.svg" alt="user"/>
                        <Link to={'/users/' + user.id}>{user.username}</Link>
                    </li>
                ))
            }

            <style jsx="true">{`
              .user-search-page-results {
                margin: 25px 0;
                list-style: none;
              }

              .user-icon {
                width: 15px;
                height: 15px;
                margin-right: 8px;
              }

              .user-search-page-results li {
                border-bottom: 1px solid gray;
                padding: 4px 4px;
              }

              .user-search-page-results li a {
                font-size: 20px;
                text-decoration: none;
                color: #434343;
                font-weight: bold;
              }

            `}
            </style>
        </ul>
    );
}

export default UserSearchPageResultList;