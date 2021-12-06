const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer();
const ivormock = require("ivormock");

function IvormockWebpackPlugin(options) {
    /**
     * 创建Ivormock项目
     */
    let promise;
    const cwd = process.cwd();
    let mockProject = ivormock.findPathProject(cwd);
    if (mockProject) {
        /**
         * 已存在项目，直接启动
         */
        promise = ivormock.stopServer(mockProject.name)
            .then(() => {
                ivormock.startServer(mockProject.name);
            })
            .then(() => {
                console.log("[ivormock-webpack-plugin]: 服务已启动...")
            });
    } else {
        /**
         * 不存在项目，先创建项目再启动
         */
        mockProject = ivormock.createProject({
            name: process.env.npm_package_name,
            base: cwd,
            mockPath: options.mockPath,
            port: options.port
        });
        promise = ivormock.startServer(mockProject.name).then(() => {
            console.log("[ivormock-webpack-plugin]: 服务已启动...")
        })
    }
    this.ivormockPromise = promise;
    this.prefix = options.prefix;
    this.mockProject = mockProject;
}

IvormockWebpackPlugin.prototype.apply = function(compiler) {
    const self = this;
    const originMiddleware = compiler.options.devServer.onAfterSetupMiddleware;
    compiler.options.devServer.onAfterSetupMiddleware = function(server) {
        if (!server) {
            throw new Error("[ivormock-webpack-plugin]: WebpackDevServer is not defined!");
        }
        originMiddleware && originMiddleware(server);
        console.log("[ivormock-webpack-plugin]: Start to prepare Ivormork...");
        server.app.all("*", function (req, res, next) {
            self.ivormockPromise.then(function() {
                if (req.url.startsWith(self.prefix)) {
                    req.url = req.url.replace(self.prefix, "/");
                    proxy.web(req, res, {
                        target: `http://localhost:${self.mockProject.usedPort || self.mockProject.port}`,
                        changeOrigin: true,
                    });
                } else {
                    next();
                }
            });
        });
        console.log("[ivormock-webpack-plugin]: Ivormock is ready!");
    }
};

module.exports = IvormockWebpackPlugin;