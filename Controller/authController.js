import lmsCollection from "../Model/lmsModel.js";

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const genrateToken = (id) => {
    return jwt.sign({ id }, process.env.JSON_WEB, { expiresIn: "1h" })
}
export const signUp = async (req, res) => {
    const { name, email, password } = req.body
    // const name=req.body.name
    try {
        const user = await lmsCollection.findOne({ email })
        if (user) return res.status(400).json({ message: "user already exists" })
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        user = new lmsCollection(
            {
                name,
                email,
                password: hashedPassword
            }
        )
        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            jwt: genrateToken(user._id)
        })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await lmsCollection.findOne({ email })
        if (!user) return res.status(400).json({ message: "invalid credential" })
        const pass = await bcrypt.compare(password, user.password)
        if (!pass) return res.status(400).json({ message: "invalid credential" })
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            jwt: genrateToken(user._id)
        })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}