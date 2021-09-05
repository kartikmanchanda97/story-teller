const { Schema } = require('mongoose');
const { isEmail } = require('validator');
const { genSalt, hash } = require('bcrypt');

const ProfileSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Enter Name'],
		minLength: [2, 'Name Must Be More Than 2 Characters']
	},
	email: {
		type: String,
		required: [true, 'Enter Email'],
		unique: true,
		validate: [isEmail, 'Plear Enter Valid Email']
	},
	password: {
		type: String,
		required: [true, 'Please Enter Password'],
		minLength: [6, 'Password Must Consist Of Atleast 6 Characters']
	}
})
ProfileSchema.pre('save', async function(next) {
	let salt = await genSalt();
	this.password = await hash(this.password, salt);
});

const BlogSchema = {
	title: {
		type: String,
		required: [true, 'Enter Title'],
		minLength: [5, 'Title Must Be More Than 5 Characters']
	},
	picture: {
		type:String,
		required: [true, 'Please Select Featured Image']
	},
	date: String,
	category: {
		type: String,
		required: [true, 'Please Select Category']
	},
	content: {
		type: String,
		required: [true, 'Write Something'],
		minLength: [6, 'Content Must Consist Of Atleast 6 Characters']
	},
	userId: String,
	authorName: String
}

const CommentSchema = {
	comment: {
		type: String,
		required: [true, 'Enter Something'],
		minLength: [2, 'Comment Must Be More Than 2 Characters']
	},
	name: String,
	date: String,
	blogId: String,
	authorId: String
}

module.exports = { ProfileSchema, BlogSchema, CommentSchema }