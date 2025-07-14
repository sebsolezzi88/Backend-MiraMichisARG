import mongoose,{Schema,Document, Types} from "mongoose";


//Modelo para los comentarios de los post de gatos
export interface IComment extends Document{
    catPostid: Types.ObjectId;
    userId: Types.ObjectId;
    text: string;
    createdAt: Date;
}

export const CommentSchema: Schema = new Schema({
    catPostId:{
        type: Schema.Types.ObjectId,
        require: true,
        ref:'CatPost'
    },
    userId:{
        type: Schema.Types.ObjectId,
        require: true,
        ref:'User'
    },
    text:{
        type: String,
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now()

    }
});

const Comment = mongoose.model<IComment>("Comment",CommentSchema);
export default Comment;