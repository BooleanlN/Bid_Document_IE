export default{
  dev:{
    '/api':{
      target:'http://localhost:8080',
      // pathRewrite: { '^/api': '' },
      changeOrigin:true
    },
    '/withoutapi':{
      target:'http://localhost:8080',
      pathRewrite: { '^/withoutapi': '' },
      changeOrigin:true
    },
  }
}