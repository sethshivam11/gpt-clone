import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookie?.accessToken || req.header("Authorization")?.split(" ")[1]
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "Unauthorized request"
            })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id).select("-password")

        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "Invalid token"
            })
        }

        req.user = user
        next()

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error!"
        })
    }
}