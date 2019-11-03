if (process.env.NODE_ENV === "dev") {
  module.exports = {
    apps: [
      {
        name: "app",
        script: "npm",
        watch: false,
        interpreter: "none",
        args: "run run:dev"
      }
    ]
  };
} else {
  module.exports = [
    {
      name: "app",
      script: "npm",
      watch: false,
      interpreter: "none",
      args: "run:prod"
    }
  ];
}
