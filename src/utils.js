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
