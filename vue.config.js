module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  devServer: {
    port: 8085,
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
  }
};
