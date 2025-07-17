import { Response } from "express";
import { ObjectId } from "mongoose";

interface CustomRequest extends Request {
    userId?: ObjectId;
    
}

export const crearBlogPost = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        
  

        return res.status(200).json({ 
            status:"success", 
            message: "ok", 
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}
export const deleteBlogPost = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        
  

        return res.status(200).json({ 
            status:"success", 
            message: "ok", 
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}
export const updateBlogPost = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        
  

        return res.status(200).json({ 
            status:"success", 
            message: "ok", 
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}
export const getBlogPostById = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        
  

        return res.status(200).json({ 
            status:"success", 
            message: "ok", 
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}
export const getBlogPosts = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        
  

        return res.status(200).json({ 
            status:"success", 
            message: "ok", 
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}