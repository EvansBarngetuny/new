import AuthenticationModal from "../../Modals/AuthenticationModal/AuthenticationModal";

function HeaderNavigationUl() {
    return (
        <ul className="app-header-nav-ul">
            <li>
                <AuthenticationModal formType="signUp" btnText="Sign Up"/>
            </li>
            <li>
                <AuthenticationModal formType="login" btnText="Login"/>
            </li>

            <style jsx>{`
              .app-header-nav-ul {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                align-items: center;
              }
              .app-header-nav-ul {
                list-style: none;
              }
              .app-header-nav-ul a {
                text-decoration: none;
                margin: 5px 15px;
                background: white;
                color: #515151;
                padding: 5px 15px;
                border: 1px solid lightgrey;
                border-radius: 5px;
              }
              .app-header-nav-ul a:hover {
                background: #f1f1f1;
              }
            `}
            </style>
        </ul>
    );
}

export default HeaderNavigationUl;