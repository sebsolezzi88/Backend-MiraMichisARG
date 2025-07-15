import { Request, Response } from "express";
import CatPost from "../models/CatPost";
import { ObjectId } from "mongoose";
import { Multer } from "multer";
import cloudinary from "../config/cloudinary";

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

    
      return res.status(201).json({ message: 'CatPost created', post: newPost });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

export const updateCatPostById = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

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

    const existingPost = await CatPost.findById(id);

    if (!existingPost) {
      return res.status(404).json({ message: "CatPost not found" });
    }

    // Si hay nueva imagen
    if (req.file) {
      // Borrar la imagen anterior en Cloudinary
      if (existingPost.photoUrl) {
        await cloudinary.uploader.destroy(existingPost.photoUrl);
      }

      // Obtener datos de la nueva imagen
      const photoUrl = req.file.path;
      const photoId = (req.file as any).filename; // Esto depende del storage

      existingPost.photoUrl = photoUrl;
      existingPost.photoId = photoId;
    }

    // Actualizar otros campos
    existingPost.typeOfPublication = typeOfPublication;
    existingPost.gender = gender;
    existingPost.catName = catName;
    existingPost.age = age;
    existingPost.description = description;
    existingPost.breed = breed;
    existingPost.location = { city, province };

    await existingPost.save();

    return res.status(200).json({ message: "CatPost updated", post: existingPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Server error" });
  }
};