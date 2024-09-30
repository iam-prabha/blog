import mongoose from "mongoose";
import { Posts, User } from "../models/models.js";
// import multer from "multer";
// import multerS3 from 'multer-s3';

// Configure AWS SDK (ensure you have your credentials set in environment variables)
// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });

// Set up multer to use S3 for storage
// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_S3_BUCKET_NAME, // Name of your S3 bucket
//         acl: 'public-read', // Permissions (this allows public access to the file)
//         metadata: (req, file, cb) => {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: (req, file, cb) => {
//             cb(null, Date.now().toString() + path.extname(file.originalname)); // Unique file name with timestamp
//         }
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
// });

export const addPost = [
    //upload.single('image'), // This middleware handles the file upload. Expect an 'image' field in the form.
    async (req, res) => {
        //get current user id
        const userId = req.userId;
        const { title, description, imageUrl } = req.body;

        //let imageUrl = req.file ? req.file.location : null;  // Get S3 file URL

        if (!(title && description)) {
            return res.status(401).send('All field mustbe filled')
        };


        try {
            const currentUser = await User.findById(userId).select('-password');

            if (!currentUser) {
                return res.status(404).send('User not found');
            }

            const posted = await Posts.create({
                postedBy: currentUser._id,
                title,
                description,
                imageUrl
            });
            res.status(200).send({ success: true, data: posted })
        } catch (error) {
            res.status(400).send({ success: false, data: 'posting failed' });
        }
    }
];

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { imageUrl, title, description } = req.body;
    try {
        //Find the post
        const isvaildPost = await Posts.findById(id);

        if (!isvaildPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the logged-in user is the post owner

        if (isvaildPost.postedBy.toString() !== req.userId.id) {
            return res.status(403).json({ message: 'Unauthorized: You do not own this post' });
        };
         // Update the post
         isvaildPost.imageUrl = imageUrl;
         isvaildPost.title = title;
         isvaildPost.description = description;

        const postupdated = await isvaildPost.save();
        res.status(200).send({ success: true, data: postupdated });

    } catch (error) {
        res.status(500).send({ success: false, message: 'post update failed!' })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params; // Post ID

        // Find the post
        const post = await Posts.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the logged-in user is the post owner
        if (post.postedBy.toString() !== req.userId.id) {
            return res.status(403).json({ message: 'Unauthorized: You do not own this post' });
        }

        // Delete the post
        const deletePost = await post.deleteOne();
        console.log(deletePost);
        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
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