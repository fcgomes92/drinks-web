if (process.env.NODE_ENV === "dev") {
  module.exports = {
    apps: [
      {
        name: "app",
        script: "yarn",
        watch: false,
        interpreter: "none",
        args: "run:dev"
      }
    ]
  };
} else {
  module.exports = [
    {
      name: "app",
      script: "yarn",
      watch: false,
      interpreter: "none",
      args: "run:prod"
    }
  ];
}
