const { connect } = require('mongoose');

connect('mongodb://localhost/social', 
	{
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
    .then(() => console.log('Database Connection Established'))
    .catch(err => console.log('Database Connection Failed: ', err));
