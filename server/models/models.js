import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : [true,'password is required'],
        default: "",
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true,'email is required'],
        default: "",
    },
    password: {
        type: String,
        required: [true,'password is required'],
        default: "",
    }
},
    {
        timestamps: true,
    }
);
const postSchema = mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    imageUrl:{
        type:String,
    },
    title: {
        type: String,
        default: '',
        required: [true,'title is required'],
    },
    description: {
        type: String,
        default: '',
        required: [true,'description is required'],
    },
});

const User = mongoose.model('users', userSchema);
const Posts = mongoose.model('posts', postSchema);

export {
    User,
    Posts,
}