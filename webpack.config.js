const path = require("path");

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js",
    assetModuleFilename: (pathData) => {
      const filepath = path
        .dirname(pathData.filename)
        .split('/')
        .slice(1)
        .join(path.sep);
      return path.join(filepath, '[name][ext]');
    },
  },
  devtool: 'source-map',
  devServer: {
    hot: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  }
};
