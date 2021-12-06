# webpack-plugin-ivormock

Webpack plugin for ivormock.

> Ivormock is made for development. Please use it in development environment **only**.

## Install

```shell
npm install -D ivormock webpack-plugin-ivormock
```

## Getting Start

> In other webpack-based tools, such as `vue-cli`, `create-react-app`, **`webpack-plugin-ivormock`**
> is used just like other common plugins.

In your `webpack.config.js`：

```js
const IvormockWebpackPlugin = require("webpack-plugin-ivormock");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
    // ... 
    plugins: [
        //...
        // Only used in development envorioment
        isDev && new IvormockWebpackPlugin({
            mockPath: "mock",   // mock file path, relative to project root
            port: 3456,          // ivormock server port
            prefix: "/mock"     // request with "/mock" prefix will pass to ivormock 
        })
    ]
}
```