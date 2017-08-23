var mongoose = require('mongoose')

// utils
var utils = require('../utils')


var DomainSchema = new mongoose.Schema({
	domainName: {type:String, trim:true, validate: [utils.Validator.required, 'domainName is required'], default:''},
	isActive: {type: Boolean, default: false},
	password: {type:String, trim:true, default:''},
	timestamp: {type:Date, default:Date.now}
})

DomainSchema.methods.summary = function(){
	var summary = {
		id: this._id.toString(),
		domainName: this.domainName,
		isActive: this.isActive,
		timestamp: this.timestamp
	}
	return summary
}

module.exports = mongoose.model('DomainSchema', DomainSchema);
