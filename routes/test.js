var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var utils = require('../utils')





router.get('/', function(req, res, next){

	res.json({
		response: "ok"
	})
})


router.get('/google', function(req, res, next){

	utils.Google.shorten("https://www.baidu.com")
		.then(function(response){
			res.json({
			  response: response
			})
		})
		.catch(function(err){
			res.status(403).json({
			  response: "failed"
			})
		})

})

router.get('/google-analytics', function(req, res, next){

	utils.Google.analytics("https://goo.gl/JG96")
		.then(function(response){
			res.json({
			  response: response
			})
		})
		.catch(function(err){
			res.status(403).json({
			  response: "failed"
			})
		})

})



router.post('/email', function(req, res, next){

	var mailOptions = {
		from: 'Roy <roy@poprx.ca>',
		to: 'jiarong1213@gmail.com',
		subject: 'test email',
		text: 'new hello'
	}

	utils.Mail.sendMail(mailOptions)
		.then(function(response){
			res.json({
			  response: "sent"
			})
		})
		.catch(function(err){
			res.status(403).json({
			  response: "failed"
			})
		})
})

module.exports = router
