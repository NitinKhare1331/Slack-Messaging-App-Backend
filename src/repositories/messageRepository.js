import Message from '../models/message.js';
import crudRepository from "./crudRepository.js";

export const messageRepository = {
    ...crudRepository(Message),

    getPaginatedMessages: async (messageParams, page, limit) => {
        const message = await Message.find(messageParams)
            .sort({ createdAt: -1 })
            .skip(( page - 1)*limit)
            .limit(limit)
            .populate('senderId', 'username email avatar');

            return message;
    }
}

export default messageRepository;