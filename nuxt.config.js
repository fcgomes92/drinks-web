module.exports = {
  modules: ["@nuxtjs/axios"],
  plugins: [
    "~/plugins/i18n",
    { src: "~/plugins/firebase" },
    { src: "~/plugins/auth" }
  ],
  srcDir: "./src",
  router: {
    middleware: "check-auth"
  },
  build: {
    devtools: process.env.NODE_ENV !== "production",
    ssr: true,
    mode: "universal"
  },
  env: {
    wsUrl: `ws://${process.env.API_HOST}:${process.env.API_PORT}${process.env.API_PREFIX}`,
    apiUrl: `http://${process.env.API_HOST}:${process.env.API_PORT}${process.env.API_PREFIX}`
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
