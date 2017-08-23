var Promise = require('bluebird')

var GoogleURL = require( 'google-url')

module.exports = {

	shorten: function(url){

		return new Promise(function(resolve, reject){

      googleUrl = new GoogleURL( { key: process.env.GOOGLE_API_KEY });
    	googleUrl.shorten(url, function( err, shortUrl ) {
    	  if(err){
    			reject(err)
    			return
    		}
    		resolve(shortUrl)
    	});
		})
	},

  analytics: function(url){

		return new Promise(function(resolve, reject){

      googleUrl = new GoogleURL( { key: process.env.GOOGLE_API_KEY });
    	googleUrl.analytics(url, function( err, results ) {
    	  if(err){
    			reject(err)
    			return
    		}
    		resolve(results)
    	});
		})
	},

}
