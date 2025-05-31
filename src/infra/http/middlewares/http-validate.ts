import { BadRequestError } from "@/core/errors/bad-request.error";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { AnyObjectSchema } from "yup";

type ValidateParams = AnyObjectSchema;

const httpValidate =
  (schema: ValidateParams) => async (req: FastifyRequest, _: FastifyReply) => {
    try {
      const { body, params, query } = await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { abortEarly: false }
      );

      req.query = query;
      req.body = body;
      req.params = params;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new BadRequestError(error.errors.join(", "));
      }

      throw new BadRequestError(error.message);
    }
  };

export { httpValidate };
