module.exports = {
  context: `${__dirname}/src`,

  entry: './index.dev',

  output: {
    path: `${__dirname}/build`,
    publicPath: '/assets/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
