import Channel from '../models/channel.js';
import crudRepository from './crudRepository.js';

const channelRepository = {
  ...crudRepository(Channel),

  getChannelWithWorkspaceDetails: async function (channelId) {
    const channel = await Channel.findById(channelId).populate('workspaceId');
    return channel;
  },

  deleteMany: async function () {
    const deleteChannels = await Channel.deleteMany();
    return deleteChannels;
  }
};

export default channelRepository;