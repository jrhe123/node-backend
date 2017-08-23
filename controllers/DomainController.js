var Domain = require('../models/Domain')
var Promise = require('bluebird')
var superagent = require('superagent')
var utils = require('../utils')

module.exports = {

	find: function(params, isRaw){

		return new Promise(function(resolve, reject){
			Domain.find(params, function(err, domains){
				if (err){
					reject(err)
					return
				}

				if (isRaw){
					resolve(domains)
					return
				}

				var summaries = []
				domains.forEach(function(domain){
					summaries.push(domain.summary())
				})

				resolve(summaries)
			})
		})
	},

	findById: function(id){
		return new Promise(function(resolve, reject){
			Domain.findById(id, function(err, domain){
				if (err){
					reject(err)
					return
				}

        console.log(err);

				resolve(domain.summary())
			})
		})
	},

	create: function(params){
		return new Promise(function(resolve, reject){

      Domain.count({domainName: params.domainName, isActive: true}, function (err, count){
		    if(count>0){
					reject({error: 'Domain has been registered'});
					return;
		    }

				Domain.create(params, function(err, domain){
					if (err){
						reject(err);
						return
					}

					resolve(domain.summary())
				})
			});

		})
	},

  update: function(id, params){

    return new Promise(function(resolve, reject){

			Domain.count({_id: {$ne : id}, domainName: params.domainName, isActive: true}, function (err, count){

				if(count>0){
					reject({error: 'Domain has been registered'});
					return;
		    }

	      Domain.findByIdAndUpdate(id, params, {new: true}, function(err, domain){
	        if(err){
	          reject(err);
	          return;
	        }

	        resolve(domain.summary())
	      })
			});

		})
  },

  delete: function(id){

    return new Promise(function(resolve, reject){

      Domain.findByIdAndRemove(id, function(err){
        if(err){
          reject(err);
          return;
        }

        resolve(null)
      })
		})
  },

}
