const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

//create schema for a User
const UserSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: 'username is required',
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            validate: [validator.isEmail, 'invalid email'],
            required: 'email address is required',
        },
        user_type: {
            type: String,
            trim: true,
            lowercase: true,
            required: 'user_type is required',
        },
        password: {
            type: String,
            required: true,
            required: 'password is required',
        },
        service: {
            type: Schema.Types.ObjectId,
            ref: 'Service',
        },
    },
    {
        timestamps: true,
    }
);

// This is schema specific to compare user passwords
UserSchema.methods.comparePassword = (foundUser, pass) => {
    return bcrypt.compareSync(pass, foundUser.password);
};

module.exports = mongoose.model('User', UserSchema);
