module.exports = {
  outputDir: __dirname + '/../server/web',  // 编译生成的文件直接放到server文件夹里
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/'
  //   : '/',    // 编译后的html文件里的资源引用路径前都加上/web/
  // devServer: { // 环境配置
  //   host: '0.0.0.0',
  //   port: 8081,
  //   https: false,
  //   hotOnly: false,
  //   disableHostCheck:true,
  //   open: true // 配置自动启动浏览器
  // },
}
