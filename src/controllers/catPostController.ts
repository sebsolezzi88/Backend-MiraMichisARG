import { Request, Response } from "express";
import CatPost from "../models/CatPost";
import mongoose, { ObjectId } from "mongoose";
import { Multer } from "multer";
import cloudinary from "../config/cloudinary";

interface CustomRequest extends Request {
    userId?: ObjectId;
    file?: Express.Multer.File;
}

interface CloudinaryFile extends Express.Multer.File {
  public_id?: string; 
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
    const file = req.file as CloudinaryFile;


    if (!file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const photoUrl = file.path; // URL generada por Cloudinary
    const photoId = file.filename;

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
      photoId
    });

    
      return res.status(201).json({ message: 'CatPost created', post: newPost });
    } catch (error) {
      console.error("Create error:", error);
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
     // Verificar que el post le pertenece al usuario logueado
    if (!existingPost.userId || existingPost.userId.toString() !== req.userId!.toString()) {
      return res.status(403).json({ message: "Unauthorized: You do not own this post" });
    }

    // Si hay nueva imagen
    if (req.file) {
      // Borrar la imagen anterior en Cloudinary
      if (existingPost.photoId) {
        await cloudinary.uploader.destroy(existingPost.photoId);
      }

      // Obtener datos de la nueva imagen
      const photoUrl = req.file.path;
      const photoId = req.file.filename; 

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

export const deleteCatPostById = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const existingPost = await CatPost.findById(id);
    
    if(!existingPost){
      return res.status(404).json({ status:"error", message: "CatPost not found" });
    }

    //Si existe el post comprobamos que pertenesca al mismo usuario
    if(!existingPost.userId || existingPost.userId.toString() !== req.userId!.toString() ){
      return res.status(403).json({ status:"error" ,message: "Unauthorized: You do not own this post" });
    }

    //Si exite borramos de la base de datos la foto
    await cloudinary.uploader.destroy(existingPost.photoId);

    //TODO: Borrar los comentarios asociados al post

    //Borramos el post
    await existingPost.deleteOne();

    return res.status(200).json({ status:"success", message: "CatPost deleted" });

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}

export const getCatPostsByUser = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;
    
    const existingPosts = await CatPost.find({ userId});
    
    return res.status(200).json({ status:"success", message: "Post Found", posts:existingPosts });

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}

export const updateCatPostStatus = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const existingPost = await CatPost.findById(id);
    
    if(!existingPost){
      return res.status(404).json({ status:"error", message: "CatPost not found" });
    }

    //Si existe el post comprobamos que pertenesca al mismo usuario
    if(!existingPost.userId || existingPost.userId.toString() !== req.userId!.toString() ){
      return res.status(403).json({ status:"error" ,message: "Unauthorized: You do not own this post" });
    }

    //Cambiar el estado del post
    if(existingPost.publicationStatus === 'resuelto'){
      existingPost.publicationStatus = 'activo';
    }else{
      existingPost.publicationStatus = 'resuelto';
    }

    await existingPost.save() //Guardar cambios;
    
    return res.status(200).json({ status:"success", message: "Status change" });

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}

export const getAllCatPosts = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    
    const existingPosts = await CatPost.find();
    
    return res.status(200).json({ status:"success", message: "Found Posts", posts:existingPosts });

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}

export const getCatPostById = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    
    const {id} = req.params;

    const existingPost = await CatPost.findById(id);

    if(!existingPost){
      return res.status(404).json({ status:"error", message: "Post not Found"});
    }
    
    return res.status(200).json({ status:"success", message: "Post Found", post:existingPost });

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}