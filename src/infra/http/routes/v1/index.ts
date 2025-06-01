import { accountRoutes } from "./account.routes";
import { authRoutes } from "./auth.routes";

const v1Routes = [
  { path: "/v1/auth", route: authRoutes },
  { path: "/v1/accounts", route: accountRoutes },
];

export default v1Routes;
