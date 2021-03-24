import HeaderNavigationLogo from "../HeaderNavigationLogo/HeaderNavigationLogo";
import HeaderNavigationUl from "../HeaderNavigationUl/HeaderNavigationUl";

function HeaderNavigation() {
    return (
        <nav className="app-header-nav">

            <HeaderNavigationLogo/>

            <HeaderNavigationUl/>

        </nav>
    );
}

export default HeaderNavigation;