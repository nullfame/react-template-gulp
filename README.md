# Template for React Applications (using gulp)

The target audience of this template is JavaScript developers (or amateurs) wanting to play with React but not worry about the dependencies you need to get started (JSX, gulp, npm, compiling, etc). The goal is to be up and running in five minutes and only have to run one command when you want to develop.

Specifically this template provides:

* Support for React 0.14.7
* “Hello, World” React component
* Gulp tasks to compile your JavaScript
* HTTP server to test on http://localhost:8080/
* Live reloading in the browser
* A single command to do all of the above (`npm start`)

Shouldn’t you take the time to learn all the dependencies?  I don’t know.  I guess so.  Maybe later?

## Set Up

Yeah, yeah, yeah, you have to have Node installed first (for the `npm` command).  That is easily done here: https://nodejs.org/en/download/

Once you have npm and this repository installed (try “Download ZIP” above and to the left if you are a true beginner) all you need to do is run this command (from the root directory):

```sh
npm install
```

## Running

Any time you want to develop, run this:

```sh
npm start
```

Then open http://localhost:8080/ in a browser.  Develop your code in src/.  Any time you make a change to index.html or anything included by src/js/app.js the page will reload automatically.  JavaScript added that isn’t included by src/js/app.js will be ignored.  Adding other files will be ignored.  You can add things to public/ (the document root) or figure out gulp.

Quit the npm process when you’re done.

## Acknowledgments

I found this tutorial by Tyler McGinnis (@tylermcginnis33) super helpful.  gulpfile.js is his code.
http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/

## Roadmap?

* Bring in Bootstrap?
* Bring in Font Awesome?
* Make HelloWorld nicer?
* Some sort of double-clickable version of `npm start`?

## Releases

v0.0.1 - Starting Point
An adequate starting point for what this project seeks to provide

## Disclaimer

I’m a programmer new to the modern JavaScript landscape.  There are probably things that could be improved.  Suggestions encouraged.

## License

The “Whatever” license.  Share and adapt freely with or without attribution even for profit.