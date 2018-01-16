const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');



const myconfig = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['env'] }
        }],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin("custom.css"),
  ]
};

process.noDeprecation = true;

module.exports = myconfig;






// const autoprefixer = require('autoprefixer');

// const postcss = {
//   loader: 'postcss-loader',
//   options: {
//     plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
//   }
// };

// // // this is our sass/css loader. It handles files that are require('something.scss')
// const styles = {
//   test: /\.(scss)$/,

// //   // here we pass the options as query params b/c it's short.
// //   // remember above we used an object for each loader instead of just a string?
// //   // We don't just pass an array of loaders, we run them through the extract plugin so they can be outputted to their own .css file
//   use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
// };

// const config = {
//   entry: {
// //     // we only have 1 entry, but I've set it up for multiple in the future
//     App: './src/app.js'
//   },
// //   // we're using sourcemaps and here is where we specify which kind of sourcemap to use
//   devtool: 'source-map',
// //   // Once things are done, we kick it out to a file.
//   output: {
//     // path: './public/dist',
// //     // // path is a built in node module
// //     // // __dirname is a variable from node that gives us the
//     path: path.resolve(__dirname, 'public', 'dist'),
// //     // we can use "substitutions" in file names like [name] and [hash]
// //     // name will be `App` because that is what we used above in our entry
//     filename: '[name].bundle.js'
//   },

// //   // remember we said webpack sees everthing as modules and how different loaders are responsible for different file types? Here is is where we implement them. Pass it the rules for our JS and our styles

//   module: {
//     rules: [styles]
//   },
//   // finally we pass it an array of our plugins
//   plugins: [
//     // here is where we tell it to output our css to a separate file
//     new ExtractTextPlugin('style.css'),
//   ]
// };

// // // webpack is cranky about some packages using a soon to be deprecated API. shhhhhhh

// // module.exports = configWes;