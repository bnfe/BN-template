const path = require("path");
const { merge } = require("webpack-merge");
const conf = require("./webpack.config");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const resolve = dir => path.resolve(__dirname, "..", dir);

const config = merge(conf, {
  // mode: "production",
  optimization: {
    usedExports: true, //哪些导出的模块被使用了，再做打包
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            pure_funcs: ["console.log", "console.table"] // 移除console
          }
        },
        parallel: 4,
        extractComments: false
      }),
      new CssMinimizerPlugin({
        parallel: 4
      })
    ],
    splitChunks: {
      chunks: "all" //所有的chunks代码公共部分分离出来成为一个单独的文件
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      //提取css为单独文件
      filename: "css/[name].[contenthash:8].css"
    }),
    new CleanWebpackPlugin({
      //打包之前清理一次
      cleanOnceBeforeBuildPatterns: [resolve(process.env.OUTPUT_DIR || "dist")]
    })
  ]
});

module.exports = config;
