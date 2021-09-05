const router = require('express').Router();
const { Comment } = require('../database/model');
const ErrHandler = require('./error_handler');

router.get('/', (req, res) => {
	Comment.find({})
	.then(data => res.json(data))
	.catch(err => console.log(err));
});

router.post('/create', (req, res) => {
	let d = new Date();
    req.body.date = `${d.getDate()} ${d.toLocaleString('default', {month:'long'})}, ${d.getFullYear()}`

	new Comment(req.body).save()
	.then(() => res.json('Comment Created'))
	.catch(err => {
		let error = { comment:'' }
		res.json(ErrHandler(err, error));
	});
});

router.delete('/delete/:id', (req, res) => {
	Comment.findByIdAndDelete(req.params.id)
	.catch(err => console.log(err));
});


module.exports = router;