import { User } from '../models/models.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).send('Your account already exists. Please log in!');

    }


    // Hash the password using promises
    bcrypt.hash(password, 10)
        .then(hashedPassword => {
            const newUser = new User({
                username,
                email,
                password: hashedPassword
            });

            return newUser.save();
        })
        .then((newUser) => {
            res.status(201).json({ message: 'User created successfully', data: newUser });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error creating user', error });
        });
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({
            error: 'Incorrect Email'
        });
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Password incorrect'
            });
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.SECRET, { expiresIn: '24h' })
        return res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }).json({ message: 'log in successfull!', data: token })

    } catch (error) {
        return res.status(500).json({ error: 'Login failed!' })
    }
};

export const logout = (_req, res) => {
    return res
        .clearCookie('token')
        .status(200)
        .json({ message: "Successfully logout out" });
};

export const getMe = async (req, res) => {
    const { _id, email } = await User.findById(req.userId);

    return res.send(`you logged in : ${email}`)
};