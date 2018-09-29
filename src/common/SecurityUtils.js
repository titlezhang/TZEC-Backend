const crypto = require('crypto');
function getRandomSalt() {
    return Math.random().toString().slice(2, 5);
}
module.exports = {
    createMD5SaltPwd: function (password) {
        if (password) {
            let salt = getRandomSalt();
            let pwdEncoded = this.encodeMD5Salt(password, salt);
            return {
                salt: salt,
                pwd: pwdEncoded
            }
        } else {
            throw new Error('密码无效');
        }
    },
    encodeMD5Salt: function (password, salt) {
        if (password && salt) {
            let md5 = crypto.createHash('md5');
            md5.update(password+":"+salt);
            return md5.digest('hex');
        } else {
            throw new Error('密码无效');
        }
    }
}