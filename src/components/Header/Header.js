import HeaderNavigationLogo from "./HeaderNavigationLogo/HeaderNavigationLogo";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import UserSearchBar from "../../UserSearch/UserSearchBar/UserSearchBar";

const Header = () => {

    return (
        <header className="app-header">
            <nav className="app-header-nav header-content-wrapper">

                <HeaderNavigationLogo/>
                <UserSearchBar />
                <HeaderNavigation />

            </nav>

            <style jsx="true">{`
              .app-header {
                position: -webkit-sticky;
                position: sticky;
                padding: 0 25px;
                top: 0;
                background: white;
                border-bottom: 1px solid lightgrey;
                z-index: 999;
              }
              .app-header-nav {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                align-items: center;
              }
            `}
            </style>
        </header>
    );
}

export default Header;