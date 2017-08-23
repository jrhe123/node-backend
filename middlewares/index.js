var controllers = require('../controllers')
var moment = require('moment')

module.exports = {

  checkApiKey : function(req, res, next) {
    var isValid = false;
    var apiKey = req.get('api-key');
    if (apiKey == null) {
      return res.status(401).json({
        Status: 'Error',
        Message: 'Api key is required'
      });
    }

    controllers.apikey
      .find(null, false)
      .then(function(apikeys) {
        for (var i = 0; i < apikeys.length; i++) {
          if (apikeys[i].value == apiKey) {
            isValid = true;
          }
        }

        if (!isValid) {
          return res.status(401).json({
            Status: 'Error',
            Message: 'Api key is invalid'
          });
        }
        next();
      })
      .catch(function(err) {
        return res.status(401).json({
          Status: 'Error',
          Message: err
        });
      })
  },


  logResponseBody: function(req, res, next) {
    var oldWrite = res.write,
        oldEnd = res.end;

    var chunks = [];
    res.write = function (chunk) {
      chunks.push(chunk);
      oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
      if (chunk)
        chunks.push(chunk);

      var body = Buffer.concat(chunks).toString('utf8');

      var then = moment(req._startTime, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
      var now = moment();
      var diff = moment.duration(then.diff(now)).asMilliseconds();
      if (diff < 0) {
        diff = Math.abs(diff);
      }
      var rtime = moment.utc(diff).format("s.SSS");

      var params = {
        url: req.originalUrl,
        method: req.method,
        params: JSON.stringify(req.body),
        apiKey: req.get('api-key'),
        rtime: rtime,
        response: JSON.stringify(body),
        responseCode: res.statusCode
      }
      controllers.log.create(params)
        .then(function(log){
          //console.log(log);
        })
        .catch(function(err){
          //console.log(err);
        })
      oldEnd.apply(res, arguments);
    };
    next();
  }

}
