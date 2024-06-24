// Currently build is set to Prod mode.

const version = 'v.2.3.9' //develop : v.1.5.9 prod :v.1.4.8

module.exports = {
  productionSourceMap: false,
  //publicPath: '/',

  publicPath: '/',

  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  },
  chainWebpack: (config) => {
    config.plugins.delete('pwa')
    config.plugins.delete('workbox')
    config.output.chunkFilename(`js/[name].[id].[chunkhash:8].js?${version}`)
  }
}
