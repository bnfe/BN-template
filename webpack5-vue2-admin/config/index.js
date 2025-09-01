const { merge } = require("webpack-merge");

const config = {};

function conf() {
  if (process.env.BN_ENV === "prod") {
    return merge(config, require("./prod"));
  }
  return merge(config, require("./dev"));
}

module.exports = conf();
