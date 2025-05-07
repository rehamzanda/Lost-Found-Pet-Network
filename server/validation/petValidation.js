const Joi = require('joi');
const mongoose = require('mongoose');

const petSchemaValidation = Joi.object({
    name: Joi.string().required(),
    species: Joi.string().required(),
    status: Joi.string().valid('Found', 'Lost', 'Other').default('Found'),
    age: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().optional(),
    ownerName: Joi.string().required(),
    ownerEmail: Joi.string().email().required(),
    ownerContact: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    type: Joi.string().valid('Pet', 'Owner').default('Pet')
}).required();

module.exports = petSchemaValidation;