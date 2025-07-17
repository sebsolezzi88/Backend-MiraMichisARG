import {body} from 'express-validator';


export const validateProfileUpdate = [
    body('name').isEmpty().withMessage("Name is required"),
    body('lastName').isEmpty().withMessage("Lastname is required"),
    body('city').notEmpty().withMessage('City is required'),
    body('province').notEmpty().withMessage('Province is required'),
];