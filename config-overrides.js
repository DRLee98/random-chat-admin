module.exports = function override(config, env) {
  let loaders = config.resolve;
  loaders.fallback = {
    fs: false,
    crypto: false,
    os: require.resolve("os-browserify/browser"),
    path: require.resolve("path-browserify"),
    process: "process/browser.js",
  };

  return config;
};
