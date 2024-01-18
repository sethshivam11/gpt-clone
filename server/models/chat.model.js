import mongoose, { Schema } from "mongoose"

const ChatSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    chats: [String],
},
{
    timestamps: true,
})

export const Chat = mongoose.model("chat", ChatSchema)