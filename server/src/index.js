import { connectDB } from "../db/index.js"
import "dotenv/config"
import app from "./app.js"

const port = process.env.PORT || 5000

connectDB()
    .then(() => app.listen(port, () => console.log(`App is listening on http://localhost:${port}`)))
    .catch((err) => console.log(`MONGODB Connection Failed\n${err}`))