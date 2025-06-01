import "reflect-metadata";
import "./container/repository";
import "./container/encrypter";
import { logger } from "../core/logger";
import { env } from "./env";
import { MongooseDataSource } from "./db/mongoose/data-source";
import { app } from "./app";

const main = async () => {
  try {
    await MongooseDataSource.connect();
    logger.info("✅ Database connected");

    const address = await app.listen({ port: env.PORT || 8080 });
    logger.info(`🚀 Server listening on ${address}`);
  } catch (error) {
    logger.error(error);

    await MongooseDataSource.disconnect();
    logger.error("❌ Database connection closed");

    process.exit(1);
  }
};

main();

process.on("SIGTERM", async () => {
  logger.info("SIGTERM received");

  await MongooseDataSource.disconnect();
  logger.info("✅ Database connection closed");
});
