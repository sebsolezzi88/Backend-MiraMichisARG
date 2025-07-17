import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (req:Request,res:Response, next:NextFunction) =>{
    
    //Comprobar errores   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}); //Si hay errores los enviamos
    }
    next();
}