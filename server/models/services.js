const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for a User
const ServiceSchema = new Schema(
    {
        service_type: {
            type: String,
            trim: true,
            required: true
        },
        special_instruction: {
            type: String,
            trim: true,
            required: true
        },
        date_requested_by: {
            type: Date,
            required: true
        },
        is_done: {
            type: Boolean,
            default: false
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
