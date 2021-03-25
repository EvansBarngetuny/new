function HeaderNavigationLogo() {
    return (
        <article className="header-nav-logo">
            <a href="#">
                <img src="/react-a-gram-logo.webp" className="nav-logo-image" alt="logo"/>
            </a>

            <style jsx>{`
              .nav-logo-image {
                max-height: 70px;
                width: 100%;
                object-fit: contain;
                display: block;
              }
            `}
            </style>
        </article>
    );
}

export default HeaderNavigationLogo;