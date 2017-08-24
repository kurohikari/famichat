const path = '/endpoints/silentlogin';
const required = ['token'];

let silent = function(req, body, res) {
    let keys = Object.keys(body);
    for(let requirement of required) {
        if(keys.indexOf(requirement) < 0) {
            res.writeHead(501, 'Invalid parameters passed');
            res.end();
            return;
        }
    }
    let token = body.token;

    try {
        //TODO implement later
        res.writeHead(200);
        res.write('Silent log in successful');
        res.end();
    } catch (e) {
        res.writeHead(500, e);
        res.end();
    }
}

var exports = module.exports = {};
exports.path = path;
exports.handler = silent;