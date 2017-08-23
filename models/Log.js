var mongoose = require('mongoose')

var LogSchema = new mongoose.Schema({
	url: {type:String, trim:true, default:''},
	method: {type:String, trim:true, default:''},
  params: {type:String, trim:true, default:''},
  apiKey: {type:String, trim:true, default:''},
  rtime: {type:String, trim:true, default:''},
  response: {type:String, trim:true, default:''},
  responseCode: {type:String, trim:true, default:''},
	timestamp: {type: Date, default: Date.now}
})

LogSchema.methods.summary = function(){
	var summary = {
		id: this._id.toString(),
		url: this.url,
		method: this.method,
    params: this.params,
    apiKey: this.apiKey,
    rtime: this.rtime,
    response: this.response,
    responseCode: this.responseCode,
		timestamp: this.timestamp
	}
	return summary
}

module.exports = mongoose.model('LogSchema', LogSchema)
