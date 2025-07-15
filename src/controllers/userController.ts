import { Request, Response } from "express";
import { validationResult } from "express-validator";


export const registerUser = async (req:Request,res:Response):Promise<Response> =>{
    try {
        //Comprobar errores
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()}); //Si hay errores los enviamos
        }
        return res.status(200).json({status:'success', message: "Listo."});
    } catch (error) {
        return res.status(500).json({status:'error', message: "Server Error."});
    }
}

export const loginUser = async (req:Request,res:Response):Promise<Response> =>{
    try {
        return res.status(200).json({status:'success', message: "Listo."});
    } catch (error) {
        return res.status(500).json({status:'error', message: "Server Error."});
    }
}