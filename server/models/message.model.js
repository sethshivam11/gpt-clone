import mongoose, {Schema} from "mongoose"

const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    chat: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "chat"
    }
})

export const Message = mongoose.model("message", messageSchema)