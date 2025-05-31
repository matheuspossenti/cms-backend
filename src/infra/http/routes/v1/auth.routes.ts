import { FastifyInstance } from "fastify";

export async function authRoutes(app: FastifyInstance) {
  // app.post(
  //   '/login',
  //   {
  //     preHandler: [httpValidate(AuthValidation.login())],
  //   },
  //   AuthController.login
  // )
  // app.post(
  //   '/refresh-token',
  //   {
  //     preHandler: [httpValidate(AuthValidation.refresh())],
  //   },
  //   AuthController.refresh
  // )
  // app.get('/me', { preHandler: [authenticate] }, AuthController.me)
}
