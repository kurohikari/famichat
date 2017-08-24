const http = require('http');
const api = require('./api/api');

let server = http.createServer(function (req, res) {
    api.map(req, res);
});

server.listen(17000);