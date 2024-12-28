
import { StatusCodes } from 'http-status-codes';

import channelRepository from '../repositories/channelRepository.js';
import messageRepository from '../repositories/messageRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserAdminOfWorkspace, isUserMemberOfWorkspace } from './workspaceService.js';

export const getChannelByIdService = async (channelId, userId) => {
  try {
    const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);

    console.log('channel data is',channel);
    
    if (!channel || !channel.workspaceId) {
      throw new ClientError({
        message: 'Channel not found with the provided ID',
        explanation: 'Invalid data sent from the client',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserPartOfWorkspace = isUserMemberOfWorkspace(channel.workspaceId, userId);

    if (!isUserPartOfWorkspace) {
      throw new ClientError({
        message:'User is not a member of the workspace and hence cannot access the channel',
        explanation: 'User is not a member of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const messages = await messageRepository.getPaginatedMessages({
      channelId
    }, 1, 20);

    console.log('Channel in service', channel);

    return {
      messages,
      _id: channel._id,
      name: channel.name,
      createdAt: channel.createdAt,
      updatedAt: channel.updatedAt,
      workspaceId: channel.workspaceId
    };

  } catch (error) {
    console.log('Get channel service error', error);
    throw error;
  }
}

export const updateChannelService = async (channelId, channelData, userId) => {
  try {
    const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);

    if (!channel || !channel.workspaceId) {
      throw new ClientError({
        message: 'Channel not found with the provided ID',
        explanation: 'Invalid data sent from the client',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isAdmin = isUserAdminOfWorkspace(channel.workspaceId, userId);

    if (!isAdmin) {
      throw new ClientError({
        message:'User is not a admin of the workspace and hence cannot update the channel',
        explanation: 'User is not a admin of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const updatedChannel = await channelRepository.update(
      channelId,
      channelData
    );

    return updatedChannel;

  } catch (error) {
    console.log('Update channel service error', error);
    throw error;
  }
}
