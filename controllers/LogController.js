var Log = require('../models/Log')
var Promise = require('bluebird')

module.exports = {

	find: function(params, isRaw){

		return new Promise(function(resolve, reject){
			Log.find(params, function(err, logs){
				if (err){
					reject(err)
					return
				}

				if (isRaw){
					resolve(logs)
					return
				}

				var summaries = []
				logs.forEach(function(log){
					summaries.push(log.summary())
				})

				resolve(summaries)
			})
		})
	},

	findById: function(id){
		return new Promise(function(resolve, reject){
			Log.findById(id, function(err, log){
				if (err){
					reject(err)
					return
				}

				resolve(log.summary())
			})
		})
	},

  create: function(params){
		return new Promise(function(resolve, reject){

			Log.create(params, function(err, log){
				if (err){
					reject(err)
					return
				}
				resolve(log.summary())
			})
		})
	},

	update: function(id, params){

    return new Promise(function(resolve, reject){

      Log.findByIdAndUpdate(id, params, {new: true}, function(err, log){
        if(err){
          reject(err);
          return;
        }

        resolve(log.summary())
      })
		})
  },

  delete: function(id){

    return new Promise(function(resolve, reject){

      Log.findByIdAndRemove(id, function(err){
        if(err){
          reject(err);
          return;
        }

        resolve(null)
      })
		})
  },



}
