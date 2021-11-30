import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { loadCommands } from "./utils.js";
import {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_GUILD_ID,
} from "./config.js";
import logger from "./logger.js";

const rest = new REST({ version: "9" }).setToken(DISCORD_TOKEN);

(async () => {
  const commands = await loadCommands();
  const commandsJson = Object.values(commands).map(({ data }) => data.toJSON());
  rest
    .put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID), {
      body: commandsJson,
    })
    .then(() => logger.info("Successfully registered application commands."))
    .catch(logger.error);
})();
