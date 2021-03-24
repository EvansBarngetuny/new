import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";

const Header = () => {
    return (
        <header className="app-header">

            <HeaderNavigation/>

            <style jsx>{`
              .app-header {
                position: -webkit-sticky;
                position: sticky;
                top: 0;
                background: white;
                border-bottom: 1px solid lightgrey;
                z-index: 999;
              }
            `}
            </style>
        </header>
    );
}

export default Header;