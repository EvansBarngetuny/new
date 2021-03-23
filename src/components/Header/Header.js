const Header = () => {
    return (
        <header className="app-header">
            <nav className="app-header-nav">
                <article className="header-nav-logo">
                    <a href="#">
                        <img src="/logo-name.jpg" className="nav-logo-image" alt="logo" />
                    </a>
                </article>
                <ul className="app-header-nav-ul">
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Sign Up</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;