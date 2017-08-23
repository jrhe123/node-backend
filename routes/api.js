var express = require('express')
var router = express.Router()
var controllers = require('../controllers')


// 1. find
router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.find(req.query, false)
    .then(function(entities) {
      res.json({
        confirmation: 'success',
        results: entities
      })
    })
    .catch(function(err) {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
})


// 2. findById
router.get('/:resource/:id', function(req, res, next) {

  var resource = req.params.resource
  var controller = controllers[resource]
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource'
    })
    return
  }

  var id = req.params.id
  controller.findById(id)
    .then(function(result) {
      res.json({
        confirmation: 'success',
        result: result
      })
    })
    .catch(function(err) {
      res.json({
        confirmation: 'fail',
        message: resource + ' ' + id + ' not found'
      })
    })
})


// 3. create
router.post('/:resource', function(req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.create(req.body)
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


// 3. update
router.post('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource
	var id = req.params.id;
  var controller = controllers[resource]
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.update(id, req.body)
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


// 4. delete
router.delete('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource
	var id = req.params.id;
  var controller = controllers[resource]
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.delete(id)
    .then(function() {
      res.json({
        confirmation: 'success'
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
