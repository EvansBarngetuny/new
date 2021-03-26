import HeaderNavigationLogo from "./HeaderNavigationLogo/HeaderNavigationLogo";
import HeaderNavigationUl from "./HeaderNavigationUl/HeaderNavigationUl";

const Header = () => {

    return (
        <header className="app-header">
            <nav className="app-header-nav">

                <HeaderNavigationLogo/>

                <HeaderNavigationUl />

            </nav>

            <style jsx>{`
              .app-header {
                position: -webkit-sticky;
                position: sticky;
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