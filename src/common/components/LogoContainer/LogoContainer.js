const LogoContainer = ({src = '', alt = ''}) => {
    return (
        <article className="logo-container-wrapper">
            <img src={src} alt={alt} />

            <style jsx="true">{`
              .logo-container-wrapper img {
                display: block;
                margin: 0 auto;
                max-width: 200px;
                object-fit: contain;
              }
            `}
            </style>
        </article>
    );
}

export default LogoContainer;