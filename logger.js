var url = 'http://mylogger.io/log';

function log(message) {
  console.log(message);
}

function debug(message) {
  console.debug(message)
}

module.exports.log = log;
module.exports.debug = debug;
module.exports.url = url;
