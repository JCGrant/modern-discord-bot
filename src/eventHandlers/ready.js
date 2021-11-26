import logger from "../logger.js";

export default {
  eventType: "ready",
  async once(client) {
    logger.info(`Ready! Logged in as ${client.user.tag}`);
  },
};
