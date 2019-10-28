module.exports = {
  srcDir: "./src",
  build: {
    devtools: process.env.NODE_ENV !== "production",
    parallel: true,
    ssr: true,
    mode: "universal",
  },
  buildDir: "./dist"
};
