import { DISCORD_TODO_LISTS_CATEGORY_NAME } from "../config.js";
import logger from "../logger.js";
import { isInCategory } from "../utils.js";

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
      !isInCategory(message.channel, DISCORD_TODO_LISTS_CATEGORY_NAME) ||
      emoji.toString() !== "❌"
    ) {
      return;
    }
    logger.info(`Removing from shopping: ${message.content}`);
    await message.delete();
  },
};
