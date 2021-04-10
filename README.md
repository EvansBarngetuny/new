# React-a-gram social media app

## Summary

A simple photo sharing social media web application based on Instagram - built with React where Firebase is used for hosting, server side and DB. The app supports user authentication, file upload, create new posts, like, comment, edit and add posts to favourites all in realtime. New posts are being created by uploading a photo and optionally adding a caption to it, it can be added or edited later. Comments to the posts can be added again only by registered users and edited or deleted at any time. The app also offers an user search functionality as well as user profile picture and profile description update functionality.

It consists of few pages: Home, My Profile, My Publications, My Favourites, My Liked Posts, {user} profile page, Single-post page, Search page and also a fixed Dashboard (will pop up upon successful login) serving as a navigation panel.

* Home page - a newsfeed comprised by the posts of all users in chronological order - from the most recent to the oldest. Visible to everyone. Only registered users can like, comment and add posts to favourites. 
* My Profile - access to my profile, where the user's description and profile pic can be updated, also displays user's latest posts, user's liked posts and the collection of favourite posts. Visible to registered users only.
* My Publications - a filtered newsfeed displaying only the current user's publications. Visible to registered users only.
* My Favourites - a filtered newsfeed displaying only the current user's favourite publications collection. Visible to registered users only.
* My Liked Posts - a filtered newsfeed displaying all the posts the current user has liked. Visible to registered users only.
* {user} profile page - contains information about the selected user such as profile pic, description and user's latest posts. Visible to everyone.
* Single-post page - Visible to everyone. Only registered users can like, comment and add the current post to favourites.
* Search page - the page, the search user functuonality and the results are accessible to everyone.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
