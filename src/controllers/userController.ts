import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import dotenv  from 'dotenv';
import User from "../models/User";
import { transporter } from "../config/mail";

dotenv.config(); //Cargar variables de entorno


export const registerUser = async (req:Request,res:Response):Promise<Response> =>{
    try {
        //Comprobar errores
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()}); //Si hay errores los enviamos
        }
        //Registrarmos al usuario.
        const newUser = await User.create(req.body);

        //Generar Token Para activar su cuenta
        const activationToken = jwt.sign({ id: newUser._id },
            process.env.SECRET_KEY!,
            { expiresIn: '1d' }
        );
        newUser.activationToken = activationToken; //Guardar token en el usuario creado
        await newUser.save();

        const activationUrl = `http://localhost:3000/api/user/activate?token=${activationToken}`;

        //Mandar mail
        await transporter.sendMail({
        from: '"Red Social de Michis 🐱" <no-reply@michinet.com>',
        to: newUser.email,
        subject: "Activa tu cuenta",
        html: `<p>Hola ${newUser.name}, activa tu cuenta dando clic en el siguiente enlace:</p>
                <a href="${activationUrl}">Activar cuenta</a>`
        });
        return res.status(200).json({status:'success', message: "User created. We send a confirmation email "});
    } catch (error) {
        return res.status(500).json({status:'error', message: "Server Error."});
    }
}

export const activateAccount = async (req: Request, res: Response): Promise<Response> => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res.status(400).json({ status: "error", message: "Token is missing or invalid." });
  }

  try {
    // Verificar el token
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);

    // Buscar usuario por ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found." });
    }

    // Verificar que el token coincida
    if (user.activationToken !== token) {
      return res.status(403).json({ status: "error", message: "Invalid activation token." });
    }

    // Activar usuario
    user.isActive = true;
    user.activationToken = undefined;
    await user.save();

    return res.status(200).json({ status: "success", message: "Account activated successfully." });

  } catch (error) {
    console.error(error);
    return res.status(401).json({ status: "error", message: "Token is invalid or expired." });
  }
};

export const loginUser = async (req:Request,res:Response):Promise<Response> =>{
    try {
        return res.status(200).json({status:'success', message: "Listo."});
    } catch (error) {
        return res.status(500).json({status:'error', message: "Server Error."});
    }
}