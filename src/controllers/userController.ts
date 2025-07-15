import { Request, Response } from "express";

export const registerUser = async (req:Request,res:Response):Promise<Response> =>{
    try {
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