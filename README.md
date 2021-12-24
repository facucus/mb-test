# PixowlGram App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using [Typescript](https://create-react-app.dev/docs/adding-typescript/).

It use [Redux](https://redux.js.org/) in order to manage the App state, [styled-components](https://styled-components.com/) for styling the app using tagged template literals & CSS, allowing you to write CSS code inside your coomponent and it also removes the mapping between components and styles.

The API was mocked using [MSW - Mock Service Worker](https://mswjs.io/) that interceot your request on the network level. And the DB was mocked using localstorage.

All client-side routing is managed using [React Router v6](https://reactrouter.com/docs/en/v6)

You can see a demo [here](https://mb-test.vercel.app/). This app was deployed using [Vercel](https://vercel.com/)

## Instructions

* First, navigate to the directory that you would like to clone the repository.
* Next, clone the remote repository and create a local copy on your machine using this command:
    * `git clone git@github.com:facucus/mb-test.git`
* Navigate to `mb-test` and run `yarn install` in order to install all dependencies.
* If you want to see and use Google & Facebook login make sure to create your apps and add the proper env variables to your `.env.local` file.
    * [How to create a Google app?](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)
    * [How to create a Facebook app?](https://developers.facebook.com/docs/development/create-an-app)
* Next, run `yarn start` and you will see the app runnin in [http://localhost:3000](http://localhost:3000).
* In order to Login you can use this credential `username: test` & `password: test`. If you click remember me it will remember that user. Or you can login using Google or Facebook. You can also click on `Sign up` and create a new account in order to access.
### .env.local Environment Variables

Each dev will need to setup their own `.env.local` file (not checked in). Copy the content of the `.env.local.sample` file and fill the variables.

<sub>Client ID for your personal test Google app for authentication - [Create your Google app](https://console.cloud.google.com/)</sub>  
NEXT_PUBLIC_CUSTOMER_API_URL={Url for your local backend Customer Service Api}

<sub>Client ID for your personal test Facebook app for authentication - [Create your Facebook app](https://developers.facebook.com/)</sub>  
NEXT_PUBLIC_CUSTOMER_API_URL={Url for your local backend Customer Service Api}

## Available Scripts

In the project directory, you can run:

```bash
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```bash
yarn test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```bash
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```bash
yarn eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

* You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
* To learn React, check out the [React documentation](https://reactjs.org/).
* [Learn Redux](https://vercel.com/) - Basic instructions & tutorials.
* [Getting started with MSWjs](https://mswjs.io/docs/getting-started) - Step by step guide.
* [Getting started with styled-components](https://styled-components.com/docs/basics#getting-started) - Step by step guide.

### Other complementary resources & libraries
* [MomentJS](https://momentjs.com/) - A JavaScript date library for parsing, validating, manipulating, and formatting dates.
* [React Dropzone](https://react-dropzone.js.org/) - Simple React hook to create a HTML5-compliant drag'n'drop zone for files.
* [React Toastify](https://github.com/fkhadra/react-toastify#readme) - Add notifications to your app with ease.
