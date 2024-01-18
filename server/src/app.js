import express from "express"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json({ limit: "50kb" }))
app.use(express.urlencoded({ extended: true, limit: "50kb" }))
app.use(express.static("public"))
app.use(cookieParser())


import { userRoute } from "../routes/user.route.js"
import { chatRoute } from "../routes/chat.route.js"

app.use("/api/v1/auth", userRoute)
app.use("/api/v1/chats", chatRoute)

import path from "path"
const __dirname1 = path.resolve()
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "client", "dist")));
    app.get("*", (_, res) => {
        res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"));
    });
} else {
    app.get("/", (_, res) => {
        res.send(
            "This page is under development mode! We are trying to make some fixes."
        );
    });
}


export default app