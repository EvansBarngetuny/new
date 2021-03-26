const CreateNewPostGuest = () => {
    return (
        <div className="notification-container">
            <p>
                To see all publications, create new posts,
                like and comment you need to be a registered user.
                Please log in to your account or sign up to create a new one.
            </p>

            <style jsx>{`
              .notification-container {
                box-sizing: border-box;
                background: white;
                max-width: 600px;
                margin: 10px auto 30px auto;
                padding: 12px;
                border: 1px solid lightgrey;
                box-shadow: 0 0 5px 0.5px #0000003b;
              }
            `}
            </style>
        </div>
    );
}

export default CreateNewPostGuest;