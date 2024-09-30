import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import authUser from './routes/users.route.js'
import userPost from './routes/post.route.js'
import { errorHandler } from './middlewares/errorhandler.js';
import cookieParser from 'cookie-parser';
import path from "path";
const app = express()
const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(cookieParser())
app.use(express.json());
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/auth', authUser);
app.use('/api/v1/posts', userPost);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`server running at localhost:${PORT} & connected to Database!`);
    })
}).catch(err => {
    console.log(err.message);
})