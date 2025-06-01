import { container } from "tsyringe";
import { JwtEncrypter } from "../cryptography/jwt-encrypter";

container.registerSingleton("encrypter", JwtEncrypter);
