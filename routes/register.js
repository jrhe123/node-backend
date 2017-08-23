var express = require('express')
var router = express.Router()

var controllers = require('../controllers')
var utils = require('../utils')

// send confirmation email
router.post('/send_email', function(req, res, next) {

  var domainID = utils.Validator.safe_array_key(req.body, 'domainID', '')
  var email = utils.Validator.safe_array_key(req.body, 'email', '')
  var password = utils.Common.random_password()

  if(!utils.Validator.email(email)){
    res.status(403).json({
      confirmation: 'fail',
      message: 'Email is invalid'
    })
    return;
  }

  var controller = controllers['domain']
  controller.update(domainID, {password: password})
    .then(function(result) {

      var text = 'Password: ' + password;
      var mailOptions = {
        from: 'Con-Reach <roy@poprx.ca>',
        to: email,
        subject: 'Confirm Registration',
        text: text
      }
      utils.Mail.sendMail(mailOptions)
    		.then(function(response){
    			res.json({
    			  confirmation: 'success',
            message: 'confirmation email has been sent'
    			})
    		})
    		.catch(function(err){
    			res.status(403).json({
            confirmation: 'fail',
    			  message: err
    			})
    		})
    })
    .catch(function(err) {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
})



// complete register
router.post('/activate', function(req, res, next) {

  var domainID = utils.Validator.safe_array_key(req.body, 'domainID', '')
  var email = utils.Validator.safe_array_key(req.body, 'email', '')
  var password = utils.Validator.safe_array_key(req.body, 'password', '')

  controllers.domain.update(domainID, {isActive: true})
    .then(function(result) {

      result['id'] = utils.Validator.safe_array_key(result, 'id', '')
      const params = {
        domain: result,
        userType: 'ADMIN',
        email: email,
        password: password
      };
      controllers.user.create(params)
        .then(function(result) {
          res.json({
            confirmation: 'success',
            result: result
          })
        })
        .catch(function(err) {
          res.json({
            confirmation: 'fail',
            message: err
          })
        })
    })
    .catch(function(err) {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
})


module.exports = router
