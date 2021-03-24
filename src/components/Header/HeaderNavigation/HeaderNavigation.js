import HeaderNavigationLogo from "../HeaderNavigationLogo/HeaderNavigationLogo";
import HeaderNavigationUl from "../HeaderNavigationUl/HeaderNavigationUl";

function HeaderNavigation() {
    return (
        <nav className="app-header-nav">

            <HeaderNavigationLogo/>

            <HeaderNavigationUl/>

            <style jsx>{`
              .app-header-nav {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                align-items: center;
              }
            `}
            </style>
        </nav>
    );
}

export default HeaderNavigation;