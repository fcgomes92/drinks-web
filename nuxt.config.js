module.exports = {
  modules: ["@nuxtjs/axios"],
  srcDir: "./src",
  build: {
    devtools: process.env.NODE_ENV !== "production",
    parallel: true,
    ssr: true,
    mode: "universal"
  },
  buildDir: "./dist",
  render: {
    http2: {
      push: true,
      pushAssets: (req, res, publicPath, preloadFiles) => {
        return preloadFiles
          .filter(f => f.asType === "script" && f.file === "runtime.js")
          .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`);
      }
    }
  }
};
