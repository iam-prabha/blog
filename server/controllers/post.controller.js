import mongoose from "mongoose";
import { Posts, User } from "../models/models.js";

export const addPost = async (req, res) => {
    //get current user id
    const userId = req.userId;
    const { title, description, imageUrl } = req.body;
    if (!(title && description)) {
        return res.status(401).send('All field must')
    }
    const currentUserId = await User.findById(userId);
    try {

        const posted = await Posts.create({
            currentUserId,
            title,
            description,
            imageUrl
        });
        res.status(201).send({ success: true, data: posted })
    } catch (error) {
        res.send(406).send('posting failed');
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invaild post update failed' });
    }
    try {
        const updatePost = await Posts.findByIdAndUpdate(id, post, { new: true });
        res.status(200).send({ success: true, data: { updatePost } })
    } catch (error) {
        res.status(500).send({ success: true, data: 'post update failed!' })
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'invalid post deletion failed!' });
    }
    try {
        await Posts.findByIdAndDelete(id);
        res.status(204).send({ success: true });
    } catch (error) {
        res.status(500).send({ message: 'post deletion failed' });
    }
}

export const fectchPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const fetchedpost = await Posts.findById(id);
        res.status(200).send({ message: 'fetch post id', data: fetchedpost })
    } catch (error) {
        res.status(500).send({ message: 'fetch post id failed!!' })
    }
}
export const fectchPost = async (req, res) => {

}