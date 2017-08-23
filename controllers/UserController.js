var User = require('../models/User')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')
var utils = require('../utils')

module.exports = {

	find: function(params, isRaw){
		return new Promise(function(resolve, reject){
			User.find(params, function(err, users){
				if (err){
					reject(err)
					return
				}

				if (isRaw){
					resolve(users)
					return
				}

				var summaries = []
				users.forEach(function(user){
					summaries.push(user.summary())
				})
				resolve(summaries)
			})
		})
	},

	findById: function(id){
		return new Promise(function(resolve, reject){
			User.findById(id, function(err, user){
				if (err){
					reject(err)
					return
				}

				resolve(user.summary())
			})
		})
	},

	create: function(params){
		return new Promise(function(resolve, reject){

			if(params.domain == null
			  || params.domain.id == null){
				reject({error: 'domain is required or domain id is required'});
				return;
			}

			var domainID = utils.Validator.safe_array_key(params.domain, 'id', '')

			User.count({"email": params.email, "domain.id": domainID}, function (err, count){
		    if(count>0){
					reject({error: 'Email already exists'});
					return;
		    }

				//hash password:
				var password = params.password
				params['password'] = bcrypt.hashSync(password, 10)

				User.create(params, function(err, user){
					if (err){
						reject(err);
						return
					}

					resolve(user.summary())
				})
			});
		})
	},

  update: function(id, params){

    return new Promise(function(resolve, reject){

			if(params.domain == null
			  || params.domain.id == null){
				reject({error: 'domain is required or domain id is required'});
				return;
			}

			var domainID = utils.Validator.safe_array_key(params.domain, 'id', '')

			User.count({"_id": {$ne : id}, "email": params.email, "domain.id": domainID}, function (err, count){

				if(count>0){
					reject({error: 'Email already exists'});
					return;
		    }

				//hash password:
				var password = params.password
				params['password'] = bcrypt.hashSync(password, 10)

	      User.findByIdAndUpdate(id, params, {new: true}, function(err, user){
	        if(err){
	          reject(err);
	          return;
	        }
					
	        resolve(user.summary())
	      })
			});

		})
  },

  delete: function(id){

    return new Promise(function(resolve, reject){

      User.findByIdAndRemove(id, function(err){
        if(err){
          reject(err);
          return;
        }

        resolve(null)
      })
		})
  },

}
