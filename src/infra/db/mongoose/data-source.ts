import mongoose, { Connection } from "mongoose";
import { env } from "../../env";
import { logger } from "../../../core/logger";

export class MongooseDataSource {
  private static instance: mongoose.Connection | null = null;

  // Connect to MongoDB
  static async connect(): Promise<void> {
    if (this.instance) {
      logger.info("Database already connected");
      return;
    }

    try {
      await mongoose.connect(env.MONGODB_URI);

      this.instance = mongoose.connection;
      logger.info("✅ MongoDB connected");
    } catch (error) {
      logger.error("❌ MongoDB connection error:", error);
      throw error;
    }
  }

  // Close the connection
  static async disconnect(): Promise<void> {
    if (!this.instance) {
      logger.info("Database is not connected");
      return;
    }

    logger.info(
      { readyState: this.instance.readyState },
      "Disconnecting MongoDB..."
    );

    try {
      await mongoose.disconnect();
      this.instance = null;
      logger.info("🔌 MongoDB disconnected");
    } catch (error) {
      logger.error("❌ Error disconnecting MongoDB:", error);
      throw error;
    }
  }

  static async cleanDatabase(): Promise<void> {
    if (!this.instance) {
      logger.info("Database is not connected");
      return;
    }

    try {
      const collections = this.instance.collections;

      for (const collectionName in collections) {
        await collections[collectionName].deleteMany({});
      }

      logger.info("✅ Database cleaned");
    } catch (error) {
      logger.error("❌ Error cleaning database:", error);
      throw error;
    }
  }

  static async dropDatabase() {
    if (!this.instance) {
      logger.info("Database is not connected");
      return;
    }

    try {
      await this.instance.dropDatabase();
      logger.info("✅ Database dropped");
    } catch (error) {
      logger.error("❌ Error dropping database:", error);
      throw error;
    }
  }

  async runMigrations() {
    // Mongoose does not have a built-in migration system like TypeORM
    // You can use a library like `migrate-mongo` for migrations
    // or implement your own migration logic here.
  }
}
