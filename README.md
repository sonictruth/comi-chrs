# ComiChrs: Angular 1.5 + ES6 + Webpack + Gulp

http://sonictruth.github.io/comi-chrs


Seed used NG6-starter.
Changes:
- Replaced stylus with SCSS
- Added Bootstrap
- Added eslint to Gulp with airbnb settings

# Getting Started

## Dependencies
Tools needed to run this app:
* `node` and `npm`
Once you have these, install the following as globals:
`npm install -g gulp karma karma-cli webpack`

## Installing
* `npm install -g gulp karma karma-cli webpack` install global cli dependencies
* `npm install` to install dependencies

## Gulp Tasks
Here's a list of available tasks:
* `webpack`
  * runs Webpack, which will transpile, concatenate, and compress (collectively, "bundle") all assets and modules into `dist/bundle.js`. It also prepares `index.html` to be used as application entry point, links assets and created dist version of our application.
* `serve`
  * starts a dev server via `webpack-dev-server`, serving the client folder.
* `watch`
  * alias of `serve`
* `default` (which is the default task that runs when typing `gulp` without providing an argument)
  * runs `serve`.
* `component`
  * scaffolds a new Angular component.
* `lint`
  * Runs eslint.

# TODO
- Multi-browser compatibility tests
- Tests specs
- CSS cleanup / add post-css webpack plugin
- Angular optimizations
- Clean up / optimize dev modules

