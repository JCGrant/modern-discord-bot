import { MessageEmbed } from "discord.js";

import logger from "../logger.js";
import { DISCORD_INTER_SERVER_CHANNELS } from "../config.js";

const [CHAN_A, CHAN_B] = DISCORD_INTER_SERVER_CHANNELS;

export default {
  eventType: "messageCreate",
  async on(message) {
    const { channelId, channel, author, content, client, attachments, embeds } =
      message;
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

    try {
      await author.fetch();
    } catch (error) {
      logger.error(`Fetching author failed: ${error}`);
      return;
    }

    const receivingChannel = client.channels.cache.get(receivingChannelId);
    const urls = [...embeds, ...attachments.values()].map((e) => e.url);

    logger.info(
      `Forwarding message "${content}" from @${author.username}. #${channel.name} (${channelId}) -> #${receivingChannel.name} (${receivingChannelId})`,
    );
    await receivingChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor(author.hexAccentColor)
          .setAuthor(author.username, author.avatarURL())
          .setDescription(content),
      ],
    });
    if (urls.length > 0) {
      await receivingChannel.send(urls.join(" "));
    }
  },
};
