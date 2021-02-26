// vue.config.js
const path = require('path');
// const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
const Version = process.env.VUE_APP_VERSION
const Timestamp = new Date().getTime();

let plugins = []
let cdn = {
    css: [],
    js: [
        'https://cdn.bootcss.com/axios/0.21.1/axios.js',
    ]
}
if (IS_PROD) {
    cdn = {
        css: [],
        js: ['https://cdn.bootcss.com/axios/0.21.1/axios.min.js', ]
    }

    //     // 开启 gzip 压缩
    //     // 需要 npm i -D compression-webpack-plugin
    //plugins.push(new CompressionWebpackPlugin({
    //             filename: "[path].gz[query]",
    //             algorithm: "gzip",
    //             test: productionGzipExtensions,
    //             threshold: 10240,
    //             minRatio: 0.8
    //         }));
}
module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? '/site/vue-demo/': '/',
    publicPath: './',
    // 公共路径
    indexPath: 'index.html',
    // 相对于打包路径index.html的路径
    outputDir: process.env.outputDir || 'dist',
    // 'dist', 生产环境构建文件的目录
    assetsDir: 'static',
    // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false,
    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
    runtimeCompiler: true,
    // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: !IS_PROD,
    // 生产环境的 source map
    parallel: require("os").cpus().length > 1,
    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    pwa: {},
    // 向 PWA 插件传递选项。
    chainWebpack: config => {
        config.resolve.symlinks(true); // 修复热更新失效
        // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        config.plugin("html").tap(args => {
            // 修复 Lazy loading routes Error
            args[0].chunksSortMode = "none";
            return args;
        });
        config.resolve.alias // 添加别名
            .set('@', resolve('src'))
            .set('@api', resolve('src/api'))

        // 移除 prefetch 插件
        config.plugins.delete('prefetch-index');
        // 移除 preload 插件，避免加载多余的资源
        config.plugins.delete('preload-index');
        // 配置cdn引入
        config.plugin('html').tap((args) => {
            args[0].cdn = cdn;
            return args;
        });

        // 压缩图片
        // 需要 `npm i -D image-webpack-loader`
        // config.module.rule("images").use("image-webpack-loader").loader("image-webpack-loader").options({
        //     mozjpeg: {
        //         progressive: true,
        //         quality: 65
        //     },
        //     optipng: {
        //         enabled: false
        //     },
        //     pngquant: {
        //         quality: [0.65, 0.9],
        //         speed: 4
        //     },
        //     gifsicle: {
        //         interlaced: false
        //     },
        //     webp: {
        //         quality: 75
        //     }
        // });
        // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
        if (IS_PROD) {
            config.plugin("webpack-report").use(BundleAnalyzerPlugin, [{
                analyzerMode: "static"
            }]);
        }
    },
    configureWebpack: () => ({
        output: {
            // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `js/[name].${Version}.${Timestamp}.js`,
            chunkFilename: `js/[name].${Version}.${Timestamp}.js`
        },
        //CDN
        externals: {
            'axios': 'axios',
        },
        plugins: [...plugins],
        optimization: {
            minimize: true,
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: "all",
                        test: /node_modules/,
                        name: "vendor",
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 100,
                    },
                    common: {
                        chunks: "all",
                        test: /[\\/]src[\\/]js[\\/]/,
                        name: "common",
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 60
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c|le)ss$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    runtimeChunk: {
                        name: 'manifest'
                    }
                }
            }
        }

    }),
    css: {
        extract: IS_PROD && {
            filename: 'css/[name].css?v=' + Version,
            chunkFilename: 'css/[name].css?v=' + Version,
        },
        requireModuleExtension: false,
        loaderOptions: {
            less: {
                sourceMap: true,
            }
        }
    },
    devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true
        },
        host: "localhost",
        port: 8080,
        // 端口号
        https: false,
        // https:{type:Boolean}
        open: true,
        //配置自动启动浏览器
        hotOnly: true,
        // 热更新
        // proxy: 'http://localhost:8080' // 配置跨域处理,只有一个代理
        proxy: { //配置多个跨域
            [process.env.VUE_APP_API_URL_PREFIX]: {
                target: "https://nbyc-test.5ialways.cn",
                // target: "http://192.168.11.144:8084",
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false,
                // pathRewrite: {
                //     ["^" + process.env.VUE_APP_API_URL_PREFIX]: "/"
                // }
            }

        }
    }
}