const { uname, psw, host, port, database } = require('./db.json');

module.exports = {
    port: process.env.PORT || 3333,
    mongoUrl: `mongodb://${uname}:${psw}@${host}:${port}/${database}?authSource=admin`
}