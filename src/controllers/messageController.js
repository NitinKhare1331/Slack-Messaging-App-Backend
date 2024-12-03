import { StatusCodes } from 'http-status-codes';

import { getMessagesService } from '../service/messageService.js';
import {
    customErrorResponse,
    internalErrorResponse,
    successResponse
} from '../utils/common/responseObjects.js';


export const getMessagesController = async (req, res) => {
    try {
        const messages = await getMessagesService(
            {
                channelId: req.params.channelId
            },
            req.query.page || 1,
            req.query.limit || 20,
            req.user
        );

        return res 
        .status(StatusCodes.OK)
        .json(successResponse(messages, 'Messages fetched Successfully'));

    } catch (error) {
        console.log('Get messages controller error', error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
}