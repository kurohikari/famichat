const http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, 'Hello World');
    res.end();
}).listen(10001);