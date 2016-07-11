# ComiChrs: Angular 1.5 + ES6 + Webpack + Gulp

Seed used NG6-starter.
Changes:
- Replaced stylus with SCSS
- Added Bootstrap
- Aded eslint to Gulp with airbnb settings

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


# Gameloft Frontend Test
The code test you are about to achieve aims to test your overall programming skills and general knowledge of good coding practices and design patterns. We will pay attention not only to the accuracy and functionality of the piece of software delivered but also the creativity pulled in to ensure the overall stability and scalability of the solution provided. Feel free to take any architectural approach and make use of any toolset of your choice. The general requirements are:

* Write well designed, testable and efficient code.
* Ensure the solution delivered is cross-platform and multi-browser compatible.
* Adaptive/responsive design will be highly appreciated.
* Leveraging a JavaScript library is mandatory. Feel free to pick any of the following: Angular (1 or 2), React, Ember, Aurelia or Backbone.
* A simple but nicely crafted UI is required. Use of HTML/CSS UI libraries is allowed.
* Follow community guidelines when coding on top of any library/framework.
* Deliver all styling code in SCSS/LESS syntax.
* Attach an automatic build script or procedure so we can deploy your solution painlessly through a one-step action. Feel free to pick whatever works best to you: Shell scripts, NPM commands, Gulp, Grunt, your own CLI, etc.
* Attach a suite of unit test specs. You can use any TDD framework, assertion library or spec runner of your choice.
* A code coverage report will be required too. No minimum coverage threshold required.
* Document all the things in a final markdown document and briefly explain the reasoning behind every choice. Please highlight what blocks you found while undertaking this assignment.

## The Test

The code test entails delivering a self-contained web project with two different levels of functionality. Both parts are mandatory. In case you do not manage to accomplish the whole assignment on time just send us what you have and attach a full explanatory document of the process. Your code will be assessed carefully by our reviewer team on either case.

### 1. Code test I – Infographic visualization
1. Choose a public data API from the Internet. You can check [this page](https://github.com/toddmotto/public-apis) for inspiration.
2. Select an API exposing a range of service endpoints with interconnected data graphs
3. Choose a data visualization library ([D3](https://d3js.org/) is fine, although you can pick whatever library that rocks your boat) and render a data-driven infographic with any visualization type of your choice. Bear in mind that your application needs to consume the data straight from the source, and this will require you to somehow bypass the browser's security constrains.
4. The data chart must be fully interactive and provide more than one level of information depth.

**Example:** From the [Marvel Comics API](http://developer.marvel.com/), represent a layout cluster chart displaying  no more than 100 comic nodes with children nodes representing the characters featured on each comic issue. Optionally, having a keyword filtering input box would be a big plus, although not required.

### 2. Code test II – Data browsing and routing
1. We want to take the previous assignment a step further, so every time the end user clicks on an interactive node/point, a detail page displaying a mash up of related data must slide in.
2. Such detail page needs to show off a nice but smooth UI transition.
3. The detail page must feature an unique URI for each record. Leverage the History API or whatever you fancy to ensure backwards navigation.
4. Tweak your SPA implementation to ensure support for deep-linking and page-reloading.

**Example:** Building up from the previous example, display a slide-in pane featuring detailed information from each Marvel character upon clicking on its corresponding node in the infographics. The location bar should reflect that state change with an unique URL, so we can move back to the previous detail view and forth by clicking on the browser's history buttons. Reaching  the same application state by loading such URL on the location bar should be supported as well, so some minor tweaks in your server implementation might be required as well.

#### Time allocated for the test: Maximum 4 days.
