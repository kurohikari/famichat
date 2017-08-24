const path = '/endpoints/login';
const required = ['email', 'pword'];

let login = function(req, body, res) {
    let keys = Object.keys(body);
    for(let requirement of required) {
        if(keys.indexOf(requirement) < 0) {
            res.writeHead(501, 'Invalid parameters passed');
            res.end();
            return;
        }
    }
    let email = body.email;
    let pword = body.pword;

    try {
        //TODO implement later
        res.writeHead(200);
        res.write('Logged in successfully');
        res.end();
    } catch (e) {
        res.writeHead(500, e);
        res.end();
    }
}

var exports = module.exports = {};
exports.path = path;
exports.handler = login;