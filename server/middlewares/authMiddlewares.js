import jwt from 'jsonwebtoken';
import { User } from '../models/models.js'
export const authMiddlewares = async (req, res, next) => {
    let token = req.headers.token;
    if (
        token
    ) {
        try {
            //VERIFY TOKEN
            const decoded = jwt.verify(token, process.env.SECRET);
            //get user from token
            req.userId = await User.findById(decoded.id);
            next()
        }
        catch (error) {
            res.status(401).json({
                message: `No authorized - ${error}`
            })
        }
    };

    if (!token) {
        return res.send({ message: 'Not Authorized, No token' });
    }
}

