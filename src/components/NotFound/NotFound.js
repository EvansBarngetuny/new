import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found-page-container">
            <img src="/react-a-gram-logo.webp" alt="logo"/>
            <h2>Oopss... you've heard of 404, haven't you?</h2>
            <p>Seems like the page you're trying to reach doesn't exist... yet.</p>
            <p>In the meantime maybe you'd like to check out our home page for some cool stuff.</p>
            <Link to="/" >Yeah, take me to HOME</Link>

            <style jsx="true">{`
              .not-found-page-container {
                text-align: center;
                max-width: 500px;
                background: white;
                border: 1px solid lightgray;
                border-radius: 5px;
                margin: 0 auto;
                padding: 30px;
                box-shadow: 0 0 5px 0.5px #0000003b;
              }

              .not-found-page-container a {
                text-decoration: none;
                color: #313131;
                cursor: pointer;
              }
              
              .not-found-page-container a:hover {
                text-decoration: underline;
              }
              
              .not-found-page-container img {
                max-width: 200px;
                object-fit: contain;
              }
            `}
            </style>
        </div>
    );
}

export default NotFound;