function HeaderNavigationLogo() {
    return (
        <article className="header-nav-logo">
            <a href="#">
                <img src="/logo-name.jpg" className="nav-logo-image" alt="logo"/>
            </a>

            <style jsx>{`
              .nav-logo-image {
                max-height: 70px;
                height: 100%;
                object-fit: contain;
                display: block;
              }
            `}
            </style>
        </article>
    );
}

export default HeaderNavigationLogo;