import {Link} from "react-router-dom";

function HeaderNavigationLogo() {
    return (
        <article className="header-nav-logo">
            <Link to="/">
                <img src="/react-a-gram-logo.webp" className="nav-logo-image" alt="logo"/>
            </Link>

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