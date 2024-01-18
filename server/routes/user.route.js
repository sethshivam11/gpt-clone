import { Router } from "express";
import { User } from "../models/user.model.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const options = {
    httpOnly: true,
    // secure: true,
}

export const userRoute = Router()

userRoute.post("/register", async (req, res) => {
    try {
        const { email, password, name } = req.body

        if (!(email || password || name)) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required",
            })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(409).json({
                success: false,
                msg: "User with this email already exists",
            })
        }

        const saveUser = await User.create({
            name, email, password
        }).select("-password")

        const accessToken = saveUser.generateAccessToken()

        res.status(200)
            .cookie("accessToken", accessToken, options)
            .json({
                success: true,
                msg: "User created successfully",
                user: saveUser,
                accessToken
            })

    } catch (err) {

        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error!",
        })
    }

})

userRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User does not exists"
            })
        }

        const accessToken = user.generateAccessToken()

        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                msg: "Invalid Password!"
            })
        }
        user.password = ""
        res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json({
                success: true,
                msg: "User logged in successfully",
                user,
                accessToken
            })

    } catch (err) {

        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error!"
        })

    }
})

userRoute.get("/logout", (_, res) => {
    return res.status(200).clearCookie("accessToken", options).json({
        success: true,
        msg: "User logged out successfully",
    })
})

userRoute.get("/user", verifyJWT, async (req, res) => {
    const { _id } = req.user
    try {
        const user = await User.findOne(_id)

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            msg: "User found successfully",
            user
        })

    } catch (err) {

        console.log(err)

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error!"
        })

    }

})