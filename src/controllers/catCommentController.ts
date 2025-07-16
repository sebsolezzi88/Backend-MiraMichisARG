import { Response,Request } from "express";
import { ObjectId } from "mongoose";
import CatPost from "../models/CatPost";
import Comment from "../models/Commet";

interface CustomRequest extends Request {
    userId?: ObjectId;
    
}

export const getPostComments = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    const {catPostId} = req.params; //id del post a comentario
    
    const existingPost = await CatPost.findById(catPostId);
    
    if(!existingPost){
      return res.status(404).json({ status:"error", message: "Post not Found"});
    }
    //Encontrar los comentarios del post
    const existingComments = await Comment.find({catPostId}).populate('userId','username');
        
    return res.status(200).json({ status:"success", message: "ok", post: existingPost,comments: existingComments});

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}
export const addComment = async (req: CustomRequest, res: Response): Promise<Response> => {
  try {
    

    const {catPostId} = req.params; //id del post a comentario
    const userId = req.userId; //id del usuario que comenta
    const {text} = req.body; //Comentario del usuario

    if(!text || text === ''){
      return res.status(400).json({ status:"error", message: "The text is required"});
    }

    const existingPost = CatPost.findById(catPostId);
    if(!existingPost){
      return res.status(404).json({ status:"error", message: "Post not Found"});
    }

    const newComment = await Comment.create({catPostId,userId,text});
    
    return res.status(200).json({ status:"success", message: "Comment created", comment: newComment});

  } catch (error) {
    console.error("Error:", error);
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