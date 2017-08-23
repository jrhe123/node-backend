var ApiKey = require('../models/Apikey')
var Promise = require('bluebird')

module.exports = {

	find: function(params, isRaw){

		return new Promise(function(resolve, reject){
			ApiKey.find(params, function(err, apikeys){
				if (err){
					reject(err)
					return
				}

				if (isRaw){
					resolve(apikeys)
					return
				}

				var summaries = []
				apikeys.forEach(function(apikey){
					summaries.push(apikey.summary())
				})

				resolve(summaries)
			})
		})
	},

	findById: function(id){
		return new Promise(function(resolve, reject){
			ApiKey.findById(id, function(err, apikey){
				if (err){
					reject(err)
					return
				}

				resolve(apikey.summary())
			})
		})
	},

  create: function(params){
		return new Promise(function(resolve, reject){

			ApiKey.create(params, function(err, apikey){
				if (err){
					reject(err)
					return
				}
				resolve(apikey.summary())
			})
		})
	},

	update: function(id, params){

    return new Promise(function(resolve, reject){

      ApiKey.findByIdAndUpdate(id, params, {new: true}, function(err, apikey){
        if(err){
          reject(err);
          return;
        }

        resolve(apikey.summary())
      })
		})
  },

  delete: function(id){

    return new Promise(function(resolve, reject){

      ApiKey.findByIdAndRemove(id, function(err){
        if(err){
          reject(err);
          return;
        }

        resolve(null)
      })
		})
  },



}
