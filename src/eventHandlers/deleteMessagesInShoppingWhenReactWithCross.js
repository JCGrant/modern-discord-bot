import { DISCORD_SHOPPING_CHANNEL_ID } from "../config.js";
import logger from "../logger.js";

export default {
  eventType: "messageReactionAdd",
  async on(reaction, { bot }) {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        logger.error(`Fetching reaction failed: ${error}`);
        return;
      }
    }
    const { message, emoji } = reaction;
    if (
      bot ||
      message.channelId !== DISCORD_SHOPPING_CHANNEL_ID ||
      emoji.toString() !== "❌"
    ) {
      return;
    }
    logger.info(`Removing from shopping: ${message.content}`);
    await message.delete();
  },
};
