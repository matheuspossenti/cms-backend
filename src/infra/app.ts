import "reflect-metadata";
import fastify from "fastify";
import cors from "@fastify/cors";
import { fastifyErrorHandler } from "../core/errors/fastify-error-handler";
import v1Routes from "./http/routes/v1";

export const app = fastify({ logger: false });

app.register(cors, {
  credentials: true,
});

// ERROR HANDLER
app.setErrorHandler(fastifyErrorHandler);

// V1 ROUTES
v1Routes.forEach((route) => {
  app.register(route.route, { prefix: route.path });
});
