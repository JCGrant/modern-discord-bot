import fs from "fs";

export const loadCommands = async () => {
  return importBotModules("./commands").then((commandModules) =>
    commandModules.reduce(
      (acc, module) => ({
        ...acc,
        [module.data.name]: module,
      }),
      {},
    ),
  );
};

export const loadEventHandlers = async () => {
  return importBotModules("./eventHandlers");
};

const importBotModules = async (directoryPath) =>
  Promise.all(
    fs
      .readdirSync(new URL(directoryPath, import.meta.url))
      .map(
        async (filename) =>
          (await import(`${directoryPath}/${filename}`)).default,
      ),
  );

export const isInCategory = (channel, categoryName) => {
  if (channel.type === "GUILD_TEXT") {
    return channel.parent?.name === categoryName;
  }
  if (
    channel.type === "GUILD_PUBLIC_THREAD" ||
    channel.type === "GUILD_PRIVATE_THREAD"
  ) {
    return channel.parent?.parent?.name === categoryName;
  }
  throw Error("channel must be GUILD_TEXT or GUILD_THREAD");
};
