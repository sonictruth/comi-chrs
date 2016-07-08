module.exports = {

  root: true,

  extends: './node_modules/eslint-config-airbnb/base.js',

  plugins: [
    'html',
  ],

  globals: {
    inject: true,
    beforeEach: true,
    expect: true,
    describe: true,
    it: true,
    console: true,
  },

  // add your custom rules here
  rules: {
    'no-console': 0,

    'no-underscore-dangle': 0,

    // allow paren-less arrow functions
    'arrow-parens': 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },

};