# Template for React Applications (using gulp)

The target audience of this template is JavaScript developers wanting to play with React without any of the dependencies (gulp, npm, compiling, etc). The goal is to be up and running in five minutes and only have to run one command when you want to develop.

Specifically this template provides:

* Support for React 0.14.7
* “Hello, World” component
* Gulp tasks to compile your JavaScript
* HTTP server to test on http://localhost:8080/
* Automatic reloading in the browser
* A single command to do all of the above (`npm start`)

Shouldn’t you take the time to learn all the dependencies?  I don’t know.  I guess so.  Maybe later?

## Set Up

Once you have this installed (try “Download ZIP” above and to the left if you are a true beginner) all you need to do is run this command (from the root directory):

```sh
npm install
```

## Running

Any time you want to develop, run this:

```sh
npm start
```

Then open http://localhost:8080/ in a browser.  Develop your code in src/.  Any time you make a change to index.html or anything included by src/js/app.js the page will reload automatically.

Quit the npm process when you’re done.

## Acknowledgments

I found this tutorial by Tyler McGinnis (@tylermcginnis33) super helpful.  gulpfile.js is his code.

http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/
