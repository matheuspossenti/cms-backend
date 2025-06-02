import { accountRoutes } from "./account.routes";
import { authRoutes } from "./auth.routes";
import { contentRoutes } from "./content.routes";
import { templateRoutes } from "./template.routes";

const v1Routes = [
  { path: "/v1/auth", route: authRoutes },
  { path: "/v1/accounts", route: accountRoutes },
  { path: "/v1/templates", route: templateRoutes },
  { path: "/v1/contents", route: contentRoutes },
];

export default v1Routes;
