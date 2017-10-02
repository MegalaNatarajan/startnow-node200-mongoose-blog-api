const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates a new Mongoose Schema with two properties
const UserSchema = new Schema({
    title: 'string',
    article: 'string',
    published: Date,
    featured: 'boolean',
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Blog', UserSchema);
