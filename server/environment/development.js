const path = require('path');

module.exports = {
  dbUrl: "mongodb+srv://underrated:uTLhewpTC12@cluster0.51i9g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  cert: path.join(__dirname, '../ssl/server.crt'),
  key: path.join(__dirname, '../ssl/server.key'),
  portHttp: 80,
  portHttps: 443
}