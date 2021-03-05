const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

//create schema for a User
const ServiceSchema = new Schema(
    {
        service_type: {
            type: String,
            trim: true,
            required: true,
        },
        special_instruction: {
            type: String,
            trim: true,
            required: true,
        },
        date_requested: {
            type: Date,
            required: true,
        },
        service_owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Service', ServiceSchema);
