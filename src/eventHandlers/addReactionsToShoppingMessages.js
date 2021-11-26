import logger from "../logger.js";
import { DISCORD_SHOPPING_CHANNEL_ID } from "../config.js";

export default {
  eventType: "messageCreate",
  async on(message) {
    if (message.channelId !== DISCORD_SHOPPING_CHANNEL_ID) {
      return;
    }
    logger.info(`Adding to shopping: ${message.content}`);
    await message.react("✅");
    await message.react("❌");
  },
};
