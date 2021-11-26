const loadEnvVar = (key, defaultValue) => {
  const value = process.env[key];
  if (!value) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`No environment variable: ${key}`);
  }
  return value;
};

export const NODE_ENV = loadEnvVar("NODE_ENV", "development");
export const DISCORD_TOKEN = loadEnvVar("DISCORD_TOKEN");
export const DISCORD_CLIENT_ID = loadEnvVar("DISCORD_CLIENT_ID");
export const DISCORD_GUILD_ID = loadEnvVar("DISCORD_GUILD_ID");
export const DISCORD_SHOPPING_CHANNEL_ID = loadEnvVar(
  "DISCORD_SHOPPING_CHANNEL_ID",
);
