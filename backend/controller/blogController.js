const router = require('express').Router();
const { Blog } = require('../database/model');
const ErrHandler = require('./error_handler');

router.get('/', (req, res) => {
	Blog.find({})
	.then(data => res.json(data))
	.catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
	Blog.findById(req.params.id)
	.then(data => res.json(data))
	.catch(err => console.log(err));
});

router.post('/create', (req, res) => {
	let d = new Date();
    req.body.date = `${d.getDate()} ${d.toLocaleString('default', {month:'long'})}, ${d.getFullYear()}`

	new Blog(req.body).save()
	.then(() => res.json('Blog Created'))
	.catch(err => {
		let error = { title:'', category:'', content:'' }
		res.json(ErrHandler(err, error));
	});
});

router.put('/update/:id', (req, res) => {
	Blog.findByIdAndUpdate(req.params.id, {$set: req.body})
	.then(() => res.json('Blog Updated'))
	.catch(err => {
		res.json(ErrHandler(err, error))
	});
});


router.delete('/delete/:id', (req, res) => {
	Blog.findByIdAndDelete(req.params.id)
	.catch(err => console.log(err));
});


module.exports = router;