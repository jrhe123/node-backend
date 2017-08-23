var nodemailer = require('nodemailer')

var Promise = require('bluebird')

module.exports = {

	sendMail: function(mailOptions){

		return new Promise(function(resolve, reject){

      var transporter = nodemailer.createTransport({
      	service: 'gmail',
      	auth: {
      			type: 'OAuth2',
      			user: 'roy@poprx.ca',
      			clientId: '193802158473-qbhs4ouk2nrquj6b0sumegmjt5861rfe.apps.googleusercontent.com',
      			clientSecret: 'ggyxjrLL4lcpfECdpO2PcB6I',
      			refreshToken: '1/0yDt2XEGLGFCpjTIZq6gNMkOQZ1744HAg-BBEa0h9kR6uWyxvimootVvcwYP4iZ1',
      			accessToken: 'ya29.GluoBA1wygm7ubyIad09jwOTN3-asfCAWTKXdTd1TZCnqbhYXcOhSTXErKmG0rST7ci9rSL3rXzBY-KlUj0gZ8tl11yKq3BQ-NN-qJvU77smRx9WfOXiPt_t5Gi-'
      	}
      })
      transporter.sendMail(mailOptions, function(err, response){
    		if(err){
    			reject(err);
          return;
    		}
        resolve(response);
    	})
		})
	}
  

}
