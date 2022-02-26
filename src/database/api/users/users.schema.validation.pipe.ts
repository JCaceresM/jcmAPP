import * as Joi from 'joi';
import {  joiString, requiredString } from '../../../common/utils/responses/validations/validationTypes';



export const createUserSchema = Joi.object({
    username: requiredString,
    password: requiredString,
    name: requiredString,
    lastName: requiredString,
    email: requiredString,

});
export const UpdateUserSchema = Joi.object({
    username: joiString,
    password: joiString,
    name: joiString,
    lastName: joiString,
    email: joiString,

});
export const UserSchemaById = Joi.object({
    id: requiredString,

});

