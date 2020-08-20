const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'));

        config
            .plugin('html')
            .tap(args => {
                args[0].title = process.env.VUE_APP_NAME;
                
                return args 
            })
    }
}