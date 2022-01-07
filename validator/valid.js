const Joi = require('joi');

const tutorialValidations = {
	createTutorialValidator: {
		body: Joi.object({
			title: Joi.string().min(3).max(100).required(),
			description: Joi.string().min(1).max(5000).required(),
			published: Joi.boolean(),
		})
	}
}

module.exports = tutorialValidations;




/*exports.createPostValidator = (req, res, next) => {


// for title

	req.check("title", "Title must not be empty").notEmpty();
	req.check("title", "Length must be between 1 to 100").isLength({
		min: 1, 
		max: 100
	});

// for body

	req.check("body", "body must not be empty").notEmpty();
	req.check("body", "Length must be between 3 to 5000").isLength({
		min: 3, 
		max: 5000
	});


	// checking errors
	const errors = req.validationErrors();

	// if error comes 

	if(errors){
		const FirstError = errors.map((error) => error.msg)[0];
		return res.status(400).json({error: FirstError});
	}

	// middleware

	next();

};*/