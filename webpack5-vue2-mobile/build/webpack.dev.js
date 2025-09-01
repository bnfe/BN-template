const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const portfinder = require("portfinder");
const conf = require("./webpack.config");

// https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
function getIPAddress() {
  var interfaces = require("os").networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "0.0.0.0";
}

let config = merge(conf, {
  // mode: "development",
  devtool: "eval-cheap-module-source-map",
  watchOptions: {
    //不监听 node_modules 目录下的文件
    ignored: /node_modules/,
  },
  devServer: {
    host: getIPAddress(),
    open: true,
    // port: 8080,
    hot: true,
    proxy: {
      "/api": {
        target: process.env.BASE_URL,
        changeOrigin: true,
      },
    },
  },
  // plugins: [new webpack.HotModuleReplacementPlugin()],
});

module.exports = async function () {
  try {
    portfinder.basePort = 8080;
    let port = await portfinder.getPortPromise();
    if (port !== portfinder.basePort) {
      console.log(`${portfinder.basePort}端口被占用，开启新端口${port}`);
      config.devServer.port = port;
    }
    return config;
  } catch (error) {
    console.log("没有找到空闲端口，请杀死进程端口再试");
    process.exit();
  }
};
