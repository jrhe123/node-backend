var mongoose = require('mongoose')

var ApikeySchema = new mongoose.Schema({
	value: {type:String, trim:true, default:''},
	description: {type:String, trim:true, default:''},
	timestamp: {type: Date, default: Date.now}
})

ApikeySchema.methods.summary = function(){
	var summary = {
		id: this._id.toString(),
		value: this.value,
		description: this.description,
		timestamp: this.timestamp
	}
	return summary
}

module.exports = mongoose.model('ApikeySchema', ApikeySchema)
