const url = require('url');
const fs = require('fs');

var endpoints = [];
for(let path of fs.readdirSync(__dirname)) {
    if(path != 'api.js') {
        let endpoint = require('./' + path.substring(0, path.length - 3));
        endpoints.push(endpoint);
    }
}

function getBody(req) {
    return new Promise(function (resolve, reject) {
        let str = "";
        req.on('data', function (data) {str += data});
        req.on('error', function (error) {reject(error)});
        req.on('end', function () {resolve(str)});
    });
}


function API() {
    let map = function(req, res) {
        let request = url.parse(req.url);
        let requestPath = request.path;
        console.log(requestPath);
        getBody(req).then(function (body) {
            let parsedBody;
            try {
                parsedBody = JSON.parse(body);
            } catch (e) {
                parsedBody = body;
            }
            let correct = false;
            for(let endpoint of endpoints) {
                if(endpoint.path == requestPath) {
                    endpoint.handler(req, parsedBody, res);
                    correct = true;
                }
            }
            if(!correct) {
                res.writeHead(501, 'No endpoint corresponding');
                res.end();
            }
        }).catch( function (error) {
            console.log(error);
            res.end();
        });
    }
    return {
        map: map
    }
}

module.exports = API();