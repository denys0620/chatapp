import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
  user: {
    id: Types.ObjectId;
    username: string;
  };
  message: string;
  timestamp: Date;
  file: {
    fileUrl: string;
    fileName: string;
  };
}

const messageSchema: Schema<IMessage> = new Schema({
  user: {
    id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true }
  },
  message: { type: String },
  timestamp: { type: Date, default: Date.now },
  file: {
    fileUrl: String,
    fileName: String
  }
});

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;
