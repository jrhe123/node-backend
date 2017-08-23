var ApikeyController = require('./ApikeyController')
var LogController = require('./LogController')
var DomainController = require('./DomainController')
var UserController = require('./UserController')

module.exports = {

	apikey: ApikeyController,
	log: LogController,

	domain: DomainController,
	user: UserController
}
