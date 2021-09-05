const { model } = require('mongoose');
const { ProfileSchema, BlogSchema, CommentSchema } = require('./schema');

require('./db');

const Profile = model('Profile', ProfileSchema);

const Blog = model('Blog', BlogSchema);

const Comment = model('Comment', CommentSchema);

module.exports = { Profile, Blog, Comment }