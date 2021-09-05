const router = require('express').Router();
const { Profile } = require('../database/model');
const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const ErrHandler = require('./error_handler');

function createToken(id, name, email) {
   return jwt.sign({id, name, email}, process.env.SECRET, { expiresIn: 24*3600*4 });
} 

router.post('/signup', async (req, res) => {
  let { email } = req.body;

  let user = await Profile.findOne({email})

  if (user) {
  	res.json('User Already Exist')
  } else {
     let user = new Profile(req.body);

	   user.save()
	   .then(() => res.json('User Created'))
	   .catch(err => {
	   	let error = { name:'', email:'', password:'' }
	   	res.json(ErrHandler(err, error));
	   }); 
  }

});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	let user = await Profile.findOne({email});

	if (user) {
     let auth = await compare(password, user.password);

     if (auth) {
     	let { id, name, email } = user;
     	let token = createToken(id, name, email)
     	res.status(200).json(token);
     } else {
     	res.json('Incorrect Password')
     }
	} else {
     res.json('User Does Not Exist');
	}
});

router.delete('/delete/:id', (req, res) => {
	Profile.findByIdAndDelete(req.params.id)
	.catch(err => console.log(err));
});


module.exports = router;