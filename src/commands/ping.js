import { SlashCommandBuilder } from "@discordjs/builders";
import logger from "../logger.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong"),

  async execute(interaction) {
    logger.info("pong!");
    await interaction.reply("Pong!");
  },
};
