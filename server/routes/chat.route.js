import { Router } from "express";
import { Chat } from "../models/chat.model.js"
import { User } from "../models/user.model.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import OpenAI from "openai"
import fs from "fs"
import path from "path"


const openai = new OpenAI({ api_key: process.env.OPENAI_API_KEY })

export const chatRoute = Router()

chatRoute.get("/history", verifyJWT, async (req, res) => {
    try {
        const { _id } = req.user

        const chats = await Chat.find({ user: _id })

        return res.status(200).json({
            success: true,
            msg: "Chat history found",
            chats
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error!"
        })
    }
})

chatRoute.post("/text", verifyJWT, async (req, res) => {
    try {
        const { prompt, chatId } = req.body
        const { _id } = req.user

        if (!prompt) {
            return res.status(401).json({
                success: false,
                msg: "Please provide a valid prompt"
            })
        }

        // const gptResponse = await openai.chat.completions.create({
        //     messages: [{ role: "system", content: prompt }],
        //     model: "gpt-3.5-turbo",
        // });

        const gptResponse = { choices: ["HI"] }
        let gptReply = gptResponse?.choices[0];
        if (!gptReply) gptReply = "Something went wrong!"
        const date = new Date;
        const promptString = `prompt: ${prompt};time: ${date.toUTCString()}`
        const replyString = `reply: ${gptReply};time: ${date.toUTCString()}`
        if (chatId) {
            await Chat.findByIdAndUpdate(chatId, {$push: { chats: { $each: [ promptString, replyString ] } } }, { new: true })
            return res.status(200).json({
                success: false,
                msg: "Chat saved successfully",
                reply: gptReply
            })
        }
        else {
            await Chat.create({
                user: _id,
                chats: [promptString, replyString]
            })
            return res.status(200).json({
                success: true,
                msg: "Chat created successfully",
                reply: gptReply,
                time: date.toUTCString()
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error!"
        })
    }

})

chatRoute.post("/audio", async (req, res) => {
    try {
        const { prompt } = req.body
        if (!prompt) {
            return res.status(402).json({
                success: false,
                msg: "Provide a valid input text"
            })
        }
        const speechFile = path.resolve("../public/temp/speech.mp3");

        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: prompt,
        })

        const buffer = Buffer.from(await mp3.arrayBuffer());
        const speech = await fs.promises.writeFile(speechFile, buffer);

        // let speech = "Audio"

        res.status(200).json({
            success: false,
            msg: "Audio file generated",
            audio: speech
        })
        return fs.unlinkSync(speechFile)

    } catch (err) {
        console.log(err)
        fs.unlinkSync(speechFile)

        return res.status(500).json({
            success: false,
            msg: "Internal Server Error!"
        })
    }
})

chatRoute.post("/image", async (req, res) => {
    const { prompt } = req.body

    const image = await openai.images.generate({ model: "dall-e-3", prompt });

    return res.status(200).json({
        success: false,
        msg: "Image generated successfully",
        image
    })
})

chatRoute.get("/save/:chatId", verifyJWT, async (req, res) => {
    const { _id } = req.user
    const { chatId } = req.params

    try {
        const user = await User.findByIdAndUpdate(_id, { $push: { saved: chatId } }, { new: true })

        return res.status(200).json({
            success: false,
            msg: "Chat saved successfully",
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