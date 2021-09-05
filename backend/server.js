const express = require('express');
const app = express();
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
require('dotenv/config');

app.use(
  cors(),
  json(),
  urlencoded({extended: true})
);

app.use('/', require('./controller/profileController'));
app.use('/blog', require('./controller/blogController'));
app.use('/comment', require('./controller/commentController'));

app.listen(5000, () => console.log('Server Running On Port 5000'));