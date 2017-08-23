var mongoose = require('mongoose')

// utils
var utils = require('../utils')


var UserSchema = new mongoose.Schema({
	domain: {type: mongoose.Schema.Types.Mixed, default: {}},
	userType: {type: String, trim:true, enum: ['ADMIN', 'MEMBER'], default:'MEMBER'},
	firstName: {type:String, trim:true, default:''},
	lastName: {type:String, trim:true, default:''},
	email: {type:String, trim:true, lowercase:true, validate: [utils.Validator.email, 'email is invalid'], default:''},
	password: {type:String, validate: [utils.Validator.required, 'password is required'], default:''},
	mobileNumber: {type:String, trim:true, default:''},
	timestamp: {type:Date, default:Date.now}
})

UserSchema.methods.summary = function(){
	var summary = {
		id: this._id.toString(),
		domain: this.domain,
		userType: this.userType,
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		mobileNumber: this.mobileNumber,
		timestamp: this.timestamp
	}
	return summary
}

module.exports = mongoose.model('UserSchema', UserSchema);
