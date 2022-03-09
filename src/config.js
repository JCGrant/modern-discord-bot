import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = loadEnvVar("NODE_ENV", "development");
export const DISCORD_TOKEN = loadEnvVar("DISCORD_TOKEN");
export const DISCORD_CLIENT_ID = loadEnvVar("DISCORD_CLIENT_ID");
export const DISCORD_GUILD_ID = loadEnvVar("DISCORD_GUILD_ID");
export const DISCORD_TODO_LISTS_CATEGORY_NAME = loadEnvVar(
  "DISCORD_TODO_LISTS_CATEGORY_NAME",
);
export const DISCORD_INTER_SERVER_CHANNELS = [
  loadEnvVar("DISCORD_INTER_SERVER_CHANNEL_A"),
  loadEnvVar("DISCORD_INTER_SERVER_CHANNEL_B"),
];

function loadEnvVar(key, defaultValue) {
  const value = process.env[key];
  if (!value) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`No environment variable: ${key}`);
  }
  return value;
}
