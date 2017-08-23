var superagent = require('superagent')

var Promise = require('bluebird')

module.exports = {

	getHosts: function(url){

		return new Promise(function(resolve, reject){
      superagent
    		.get(url)
    		.query(null)
        .set('Authorization', 'sso-key 9jSjCmpgDUc_QnEFLt4Z229rU1NEKULM16:QnELEuZxgp3fhpmnLuBKqe')
    		.set('Accept', 'application/json')
        .end(function(err, hosts){
          if(err){
            reject(err);
            return;
          }

          resolve(hosts);
        })
		})
	},


  registerHost: function(url, recordArr) {

    return new Promise(function(resolve, reject) {
      superagent
        .patch(url)
        .send(recordArr)
        .set('Authorization', 'sso-key 9jSjCmpgDUc_QnEFLt4Z229rU1NEKULM16:QnELEuZxgp3fhpmnLuBKqe')
        .set('Accept', 'application/json')
        .end(function(err, host) {
          if (err) {
            reject(err);
            return;
          }

          resolve(host)
        })
    })
  },
  


}
