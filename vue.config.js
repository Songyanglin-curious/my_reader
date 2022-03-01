function mock(app, url, data) {
  app.get(url, (request, response) => {
    response.json(data);
  });
}
const homeData = require("./src/mock/bookHome");
const shelfData = require("./src/mock/bookShelf");
const listData = require("./src/mock/bookList");
const flatListData = require("./src/mock/bookFlatList");
const path = require("path");
module.exports = {
  // publicPath : process.env.NODE_ENV = 'production' ? './' : '/',
  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "" : "./",
  // 输出文件目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  configureWebpack: (config) => {
    config.resolve = {
      // 配置解析别名
      extensions: [".js", ".json", ".vue"], // 自动添加文件名后缀
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@c": path.resolve(__dirname, "./src/components"),
      },
    };
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  // css: {
  //     // 是否使用css分离插件 ExtractTextPlugin
  //     extract: true,
  //     // 开启 CSS source maps?
  //     sourceMap: false,
  //     // css预设器配置项
  //     loaderOptions: {
  //         scss: {
  //             additionalData: `@import "./src/styles/global.scss";`
  //         }
  //     }
  // },
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 编译完成是否打开网页
    host: "0.0.0.0", // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    before(app) {
      mock(app, "/book/home", homeData);
      mock(app, "/book/shelf", shelfData);
      mock(app, "/book/list", listData);
      mock(app, "/book/flat-list", flatListData);
    },
    // proxy: {
    //   [process.env.VUE_APP_API]: {
    //       target: process.env.VUE_API_DEV_TARGET, //API服务器的地址
    //       changeOrigin: true,
    //       pathRewrite: {
    //           [`^${process.env.VUE_APP_API}`]: ''
    //       }
    //   }
    // }
  },
};
