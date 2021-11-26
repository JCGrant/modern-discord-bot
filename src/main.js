import { Client, Intents } from "discord.js";
import dotenv from "dotenv";
import { loadCommands, loadEventHandlers } from "./utils.js";
import { NODE_ENV, DISCORD_TOKEN } from "./config.js";

if (NODE_ENV !== "production") {
  dotenv.config();
}

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

(async () => {
  const eventHandlers = await loadEventHandlers();
  eventHandlers.forEach(({ eventType, once, on }) => {
    if (once) {
      client.once(eventType, once);
    }
    if (on) {
      client.on(eventType, on);
    }
  });

  const commands = await loadCommands();
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const command = commands[interaction.commandName];
    if (!command) return;
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });

  client.login(DISCORD_TOKEN);
})();