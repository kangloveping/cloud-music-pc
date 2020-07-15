
module.exports = {
    // 基本路径
    publicPath: "./",  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
    outputDir: "dist",  //打包时生成的生产环境构建文件的目录
    assetsDir: 'public',  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    devServer: {
        proxy: {
            '/api': {    //为转发路径
                target: 'https://autumnfish.cn/',  // 目标地址
                ws: true, // 是否代理websockets
                changeOrigin: true,  // 设置同源  默认false，是否需要改变原始主机头为目标URL,     
                pathRewrite: {
                    '^/api': ''
                }
            }

        }
    },
}
