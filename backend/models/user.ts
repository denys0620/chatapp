import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId; // Explicit _id
  username: string;
  password?: string;
  createdAt: Date;
  googleId?: string;
  email?: string;
  picture?: string;
}

const userSchema: Schema<IUser> = new Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  picture: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Optional: expose `id` as string instead of ObjectId when converting to JSON
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.password; // Optional: hide password in API responses
  }
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;