var Promise = require('bluebird')

module.exports = {

	required: function(v){
		return v.length > 0;
	},

  email: function(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isValidate = re.test(email);

    return isValidate;
  },

	safe_array_key(obj, key, defaultValue){
		if(key in obj){
			return obj[key];
		}else{
			return defaultValue;
		}
	},

}
