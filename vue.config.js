module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    // host: "132.73.84.133"
    host: "localhost"
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
