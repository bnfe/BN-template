const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const getClientEnvironment = require("./env");
const env = getClientEnvironment();

const resolve = dir => path.resolve(__dirname, "..", dir);

// 打包排除某些依赖
const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  // vuex: "Vuex",
  pinia: "Pinia",
  vant: "vant",
  // axios: "axios",
};

// cdn资源
const cdn = {
  // 开发环境
  dev: {
    css: ["//cdn-scp.banu.cn/npm/vant/4.8.2/index.css"],
    js: [],
  },
  // 生产环境
  build: {
    css: ["//cdn-scp.banu.cn/npm/vant/4.8.2/index.css"],
    js: [
      "//cdn-scp.banu.cn/npm/vue/3.4.8/vue.global.prod.js",
      "//cdn-scp.banu.cn/npm/vue-router/4.2.5/vue-router.global.prod.js",
      // "//cdn-scp.banu.cn/npm/vuex/4.1.0/vuex.global.prod.js",
      "//cdn-scp.banu.cn/npm/vue-demi/0.14.6/index.iife.js",
      "//cdn-scp.banu.cn/npm/pinia/2.1.7/pinia.iife.prod.js",
      "//cdn-scp.banu.cn/npm/vant/4.8.2/vant.min.js",
    ],
  },
};

const config = {
  mode: process.env.NODE_ENV || "development",
  // target: "web",
  entry: {
    base: ["core-js/stable", "regenerator-runtime/runtime"],
    main: [resolve("src/main.ts")],
  },
  output: {
    filename: "js/[name].[chunkhash:8].js",
    path: resolve(process.env.OUTPUT_DIR || "dist"),
  },
  resolve: {
    modules: [resolve("src"), "node_modules"],
    // alias: {
    //   "@": resolve("src"),
    //   "~": resolve(""),
    // },
    extensions: [".js", ".jsx", "cjs", "mjs", ".ts", ".tsx", ".vue", ".json"],
    plugins: [new TsconfigPathsPlugin()],
  },
  cache: {
    type: "filesystem",
    // 可选配置
    buildDependencies: {
      config: [__filename], // 获取最新配置以及所有依赖项
    },
    name: `mode-${process.env.NODE_ENV}`, // 配置独立的缓存
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        // include: resolve("src"),
        use: {
          loader: "vue-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx", // 默认为js
              target: "es2015",
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true, // 提高构建速度
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.[cm]?jsx?$/, //适配js和jsx以及cjs和mjs
        // include: resolve("src"),
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|scss)$/,
        // include: resolve("src"),
        //loader是有顺序的，从后往前
        use: [
          process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader", //在页面插入css样式
          "css-loader", // 抽取css样式
          "postcss-loader", // 样式前缀自动补全
          // "thread-loader", // 加快构建速度
          {
            loader: "sass-loader", // sass当做css技术栈
            options: {
              additionalData: "@import '@/styles/index.scss';",
            },
          },
        ],
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/,
      //   //use使用一个loader可以用对象，字符串，两个loader需要用数组
      //   use: {
      //     loader: "file-loader",
      //     //options额外的配置，比如资源名称
      //     options: {
      //       //placeholder 占位符 [name]老资源模块的名称 [ext]老资源模块的后缀
      //       name: "[name].[hash:8].[ext]",
      //       //打包后存放的位置
      //       outputPath: "img",
      //       esModule: false,
      //     },
      //   },
      // },
      // {
      //   test: /\.(eot|ttf|woff|woff2)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "[name].[hash:8].[ext]",
      //       outputPath: "font",
      //     },
      //   },
      // },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: resolve("src"),
        type: "asset",
        generator: {
          // [ext]前面自带"."
          filename: "img/[name].[hash:8][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        // include: resolve("src"),
        type: "asset/resource",
        generator: {
          filename: "font/[name].[hash:8][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "", //标题
      filename: "index.html", // 输出的文件名，默认是index.html
      template: "public/index.html", // 模板文件路径
      favicon: "public/favicon.ico",
      minify:
        process.env.NODE_ENV === "production"
          ? {
              //压缩HTML文件
              removeComments: true, // 移除HTML中的注释
              collapseWhitespace: true, // 删除空白符和换行符
            }
          : false,
      cdn: process.env.NODE_ENV === "production" ? cdn.build : cdn.dev,
    }),
    new InterpolateHtmlPlugin(env.raw),
    new webpack.DefinePlugin(env.stringified),
    new NodePolyfillPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      globalConfig: resolve("config"),
    }),
  ],
  externals: process.env.NODE_ENV === "production" ? externals : {},
};

module.exports = config;
