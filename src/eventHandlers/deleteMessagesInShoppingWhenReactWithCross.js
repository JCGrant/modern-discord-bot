import { DISCORD_SHOPPING_CHANNEL_ID } from "../config.js";

export default {
  eventType: "messageReactionAdd",
  async on({ message, emoji }, { bot }) {
    if (
      bot ||
      message.channelId !== DISCORD_SHOPPING_CHANNEL_ID ||
      emoji.toString() !== "❌"
    ) {
      return;
    }
    await message.delete();
  },
};
