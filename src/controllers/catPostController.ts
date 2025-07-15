import { Request, Response } from "express";

export const createCatPost = async (req:Request,res:Response):Promise<Response> =>{

    try {
        

        return res.status(200).json({ message: 'Login successful'});
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}