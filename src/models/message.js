import mongoose, { Mongoose } from "mongoose";

const messageSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, "Message body is required"]
    },
    image: {
        type: String,
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: [true, "Channel ID is required"]
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender ID s required']
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: [true, 'Workspace ID is required']
    }
});

const Message = mongoose.Model('Message', messageSchema);

export default Message;