const crypto = require('crypto');

let pword = 'lirbggriugsnergo';
console.log('original: ', pword);

console.log('after: ', hashPassword(pword));

function hashPassword(password) {
    let time = new Date();
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 3854012;
    var hash = crypto.pbkdf2Sync(password, salt, iterations, 256, 'sha512');
    
    let timeout = (new Date()).getTime() - time.getTime();
    console.log('time taken: ', timeout);
    console.log('password: ', hash.toString('hex'));

    return {
        salt: salt,
        hash: hash,
        iterations: iterations
    };
}