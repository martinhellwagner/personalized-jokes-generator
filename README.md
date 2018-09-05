# Personalized Jokes Generator

## Introduction

This website generates a list of Chuck Norris jokes fetched from [this API](https://api.icndb.com/jokes) and personalises them with the name of user. For the jokes to be personalized correctly, the user needs to log in using *Google OAuth*. Initially, all the jokes are displayed and sorted at random. However, it is possible to search for a specific keyword and display only the jokes matching the search term.

The following core technologies are used for the project:

* Node.js / Node Package Manager (NPM)
* Express
* Javascript (ES6) / React
* Gulp
* Mocha / Enzyme

## How to get stared

To get started, you first need to make sure that you have [Node.js](https://nodejs.org/en) and [NPM](https://www.npmjs.com) installed. If you haven't, please do so before continuing. With Node.js and NPM set up, you can go ahead and install the necessary packages by calling this command from the root directory:

    npm install

After all the packages are installed, you are ready to start the application. Through the power of [Gulp](https://gulpjs.com) (the code for which is found in the gulpfile), all the commands needed for this process are called automatically. All you need to do to start the project is call this command from the root directory:

    npm run start

Your application is now running and you can access it by typing the following URL into your browser:

    http://localhost:8080

When you want to run some basic tests written for the project, simply call this command from the root directory:

    npm run test
