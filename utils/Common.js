var Promise = require('bluebird')

module.exports = {

	random_password(){
		return Math.floor(Math.random()*900000) + 100000;
	},

}
