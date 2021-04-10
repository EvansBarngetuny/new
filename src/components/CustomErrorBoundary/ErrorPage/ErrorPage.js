const ErrorPage = () => {
    return (
        <div className="error-page-container">
            <h2>Something went wrong...</h2>
            <p>We are sorry about that, please, reload the page or try again later.</p>
            <p>Thank you!</p>

            <style jsx="true">{`
              .error-page-container {
                max-width: 500px;
                background: white;
                border: 1px solid lightgray;
                border-radius: 5px;
                margin: 0 auto;
                padding: 30px;
                box-shadow: 0 0 5px 0.5px #0000003b;
              }
            `}
            </style>
        </div>
    );
}

export default ErrorPage;