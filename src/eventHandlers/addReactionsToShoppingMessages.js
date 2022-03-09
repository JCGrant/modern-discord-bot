import logger from "../logger.js";
import { DISCORD_TODO_LISTS_CATEGORY_NAME } from "../config.js";
import { isInCategory } from "../utils.js";

export default {
  eventType: "messageCreate",
  async on(message) {
    if (!isInCategory(message.channel, DISCORD_TODO_LISTS_CATEGORY_NAME)) {
      return;
    }
    logger.info(`Adding to shopping: ${message.content}`);
    await message.react("✅");
    await message.react("❌");
  },
};
