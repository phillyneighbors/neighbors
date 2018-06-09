// A completely modular api route
// this route imports our controllers and then grabs the appropriate one
// based on the resource variable in the route.
// Because we're not hardcoding any of the routes this api route can be used to
// fetch our neighborhood zones, chat histories, and users by referreing to those controllers
// Additionaly, this route file can be resued in any other project
const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/:resource', function(req, res, next){
	var resource = req.params.resource;
	var controller = controllers[resource];
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	controller.get(req.query)
	.then(function(results){
		res.json({
	    confirmation: 'success',
	    results: results
	  })
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			errorMessage: err
		})
	})
})
router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id
	var controller  = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	controller.getById(id)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})

router.post('/:action', function(req, res, next){
	var action = req.params.action;
	var controller = controllers[action]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	controller.post(req.body)
	.then(function(result){
		if (action == 'inquiry'){
			res.redirect('/confirmation')
			return
		}
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})

module.exports = router;
