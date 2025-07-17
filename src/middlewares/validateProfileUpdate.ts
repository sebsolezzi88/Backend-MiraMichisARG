import {body} from 'express-validator';


export const validateProfileUpdate = [
    body('name').notEmpty().withMessage("Name is required"),
    body('lastName').notEmpty().withMessage("Lastname is required"),
    body('city').notEmpty().withMessage('City is required'),
    body('province').notEmpty().withMessage('Province is required'),
];