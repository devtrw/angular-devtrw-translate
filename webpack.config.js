//@formatter:off
var webpack    = require('webpack');
var deepExtend = require('deep-extend');
var fs         = require('fs');

var packageJsonString = fs.readFileSync('package.json', 'utf8');
var packageJson       = JSON.parse(packageJsonString);
//@formatter:on

var baseConfig = {
  context:   __dirname + '/src',
  entry:     './index.js',
  output:    {
    path:     __dirname + '/dist',
    filename: packageJson.name + '.js'
  },
  stats:     {
    colors:  true,
    reasons: true
  },
  plugins:   [],
  module:    {
    loaders: [
      {test: /\.js$/, loader: 'ng-annotate!babel!jshint', exclude: /node_modules/}
    ]
  },
  jshint:    {
    failOnHint: false,
    emitErrors: false
  },
  externals: {
    angular:             'angular',
    'angular-translate': 'angular'
  }
};

var devConfig = {
  devtool: 'inline-source-map'
};

var prodConfig = {
  output:  {
    filename: packageJson.name + '.min.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({exclude: /node_modules/})
  ],
  devtool: 'source-map',
  jshint:  {
    failOnHint: true,
    emitErrors: true
  }
};

var configContexts = {
  development: devConfig,
  production:  prodConfig,
  test:        deepExtend({}, devConfig)
};

var context = process.env.NODE_ENV || 'development';
var contextConfig = deepExtend({}, baseConfig, configContexts[context]);

console.log('Webpack config is in ' + context + ' context');
module.exports = contextConfig;
