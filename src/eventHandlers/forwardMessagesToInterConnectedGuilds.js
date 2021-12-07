import { MessageEmbed } from "discord.js";

import logger from "../logger.js";
import { DISCORD_INTER_SERVER_CHANNELS } from "../config.js";

const [CHAN_A, CHAN_B] = DISCORD_INTER_SERVER_CHANNELS;

export default {
  eventType: "messageCreate",
  async on({ channelId, author, content, client }) {
    let receivingChannelId;
    if (channelId === CHAN_A) {
      receivingChannelId = CHAN_B;
    } else if (channelId === CHAN_B) {
      receivingChannelId = CHAN_A;
    } else {
      return;
    }
    if (author.bot) {
      return;
    }
    logger.info(
      `Forwarding message '${content}' from author '${author.username}' to channel: ${receivingChannelId}'`,
    );

    try {
      await author.fetch();
    } catch (error) {
      logger.error(`Fetching author failed: ${error}`);
      return;
    }

    await client.channels.cache.get(receivingChannelId).send({
      embeds: [
        new MessageEmbed()
          .setColor(author.hexAccentColor)
          .setAuthor(author.username, author.avatarURL())
          .setDescription(content),
      ],
    });
  },
};
