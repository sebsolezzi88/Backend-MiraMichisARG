import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import { transporter } from "../config/mail";


export const registerUser = async (req:Request,res:Response):Promise<Response> =>{
    try {
        //Comprobar errores
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()}); //Si hay errores los enviamos
        }
        //Registrarmos al usuario.
        const newUser =await User.create(req.body);

        //Mandar mail
        await transporter.sendMail({
        from: '"Red Social de Michis 🐱" <no-reply@michinet.com>',
        to: newUser.email,
        subject: "Activa tu cuenta",
        html: `<p>Hola ${newUser.name}, activa tu cuenta dando clic en el siguiente enlace:</p>
                <a href="http://localhost:3000/activar/">Activar cuenta</a>`
        });
        return res.status(200).json({status:'success', message: "User created. We send a email confirmation"});
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