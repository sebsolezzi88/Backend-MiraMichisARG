import { Response,Request } from "express";
import { ObjectId } from "mongoose";

interface CustomRequest extends Request {
    userId?: ObjectId;
    
}

export const getPostComments = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    
    
    
    return res.status(200).json({ status:"success", message: "ok"});

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}
export const addComment = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    
    
    
    return res.status(200).json({ status:"success", message: "ok"});

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}

export const updateComment = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    
    
    
    return res.status(200).json({ status:"success", message: "ok"});

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}

export const deleteComment = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    
    
    
    return res.status(200).json({ status:"success", message: "ok"});

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}