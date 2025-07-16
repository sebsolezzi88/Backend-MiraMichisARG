import { Request, Response } from "express";
import { isValidObjectId, ObjectId } from "mongoose";
import User from "../models/User";
import Message from "../models/Message";

interface CustomRequest extends Request {
    userId?: ObjectId;
    
}

export const sendMessage = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        const {text,toUserId} = req.body;

        if(!text){
            return res.status(400).json({ status:"error", message: "Text required"});
        }
        if(!toUserId || !isValidObjectId(toUserId)){
            return res.status(400).json({ status:"error", message: "Invalid ID"});
        }

        //Comprobar si el receptor existe
        const existUser = await User.findById(toUserId);
        if(!existUser){
            return res.status(404).json({ status:"error", message: "User not found"});
        }

        //Si existe mandamos el mensaje
        const newMessage = await Message.create({
            fromUserId: req.userId,
            toUserId: toUserId,
            text: text
        })

        return res.status(200).json({ 
            status:"success", 
            message: "Message send",
            newMessage
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}

export const getMessageReceived = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        
        //Obtener los mensajes recibidos
        const receivedMessages =  await Message.find({toUserId:req.userId})
                                .sort({ createdAt: -1 })
                                .populate('fromUserId', 'username avatarUrl'); 

        return res.status(200).json({ 
            status:"success", 
            message: "Message send",
            receivedMessages
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}

export const getMessageSended = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        
        //Obtener los mensajes enviados
        const receivedMessages = await Message.find({fromUserId:req.userId})
                                .sort({ createdAt: -1 })
                                .populate('fromUserId', 'username avatarUrl'); 

        return res.status(200).json({ 
            status:"success", 
            message: "Message send",
            receivedMessages
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}

export const markMessageRead = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        
        const {id} = req.body;

        if(!id || !isValidObjectId(id)){
            return res.status(400).json({ status:"error", message: "Invalid ID"});
        }

        //Verificar si existe el mensaje
        const existMessage = await Message.findById(id);

        if(!existMessage){
            return res.status(400).json({ status:"error", message: "Message not found"});
        }

        if(existMessage.read){
            return res.status(400).json({ status:"error", message: "You have already marked this as read"});
        }else{
            existMessage.read = true;
            await existMessage.save();
        }

        return res.status(200).json({ 
            status:"success", 
            message: "Message send"
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}
