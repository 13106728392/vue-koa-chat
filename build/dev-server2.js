require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var koa = require('koa')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = new koa();

// const server = require('http').Server(app);

const io = require('socket.io')(app);

const http = require('http');

const https = require('https');

var bodyParser = require('body-parser');
// var multer = require('multer');
var mysql      = require('mysql');
// var connection = mysql.createConnection({
//     host: '127.0.0.1', //主机
//     user: 'huang_iiio',     //数据库用户名
//     password: 'huang_iiio',     //数据库密码
//     port: '3306',       
//     database: 'huang_iiio', //数据库名称
//     charset: 'UTF8_GENERAL_CI' //数据库编码
// });

// 本地
var connection = mysql.createConnection({
    host: '127.0.0.1', //主机
    user: 'root',     //数据库用户名
    password: '',     //数据库密码
    port: '3306',       
    database: 'h1', //数据库名称
    charset: 'UTF8_GENERAL_CI' //数据库编码
});

connection.connect(err=>{
  if (err) {
      console.log('[query] - :' + err);
      return;
  }
  console.log('[connection connect]  succeed!'); 
});

connection.query('select * from h3', function(err, rows, fields) {
  if (err) throw err;
  console.log(rows);
  connection.end()
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

io.on('connection', (socket) => {


  // 群聊
  socket.on('sendGroupMsg', function (data) {
    socket.broadcast.emit('receiveGroupMsg', data);
  });

  // 上线
  socket.on('online', name => {
    socket.broadcast.emit('online', name)
  });

})


var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)



// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

// var server = app.listen(port)

app.listen(8080);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
