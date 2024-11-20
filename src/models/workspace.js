import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Workspace name is required'],
        unique: true
    },
    description: {
        type: String
    },
    members: [
        {
            memberId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            role: {
                enum: ['admin', 'member'],
                default: 'member'
            }
        }
    ],
    joinCode: {
        type: String,
        required: [true, 'Join code is required']
    },
    channels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "channel"
        }
    ]
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;