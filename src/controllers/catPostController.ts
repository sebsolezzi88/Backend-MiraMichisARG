import { Request, Response } from "express";
import CatPost from "../models/CatPost";
import { ObjectId } from "mongoose";
import { Multer } from "multer";

interface CustomRequest extends Request {
    userId?: ObjectId;
    file?: Express.Multer.File;
}

export const createCatPost = async (req:CustomRequest,res:Response):Promise<Response> =>{

    try {
        // Campos del formulario
    const {
      typeOfPublication,
      gender,
      catName,
      age,
      description,
      breed,
      city,
      province,
    } = req.body;
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    // Archivo subido
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const photoUrl = file.path; // URL generada por Cloudinary

    // Guardar en MongoDB
    const newPost = await CatPost.create({
      userId: req.userId, // user inyectado por middleware
      typeOfPublication,
      gender,
      catName,
      age,
      description,
      breed,
      location: { city, province },
      photoUrl,
    });

    res.status(201).json({ message: 'CatPost created', post: newPost });

        return res.status(200).json({ message: 'Login successful'});
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}