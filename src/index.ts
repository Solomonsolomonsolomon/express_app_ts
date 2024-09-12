import { Router } from "express";
const appRoutes: Router = Router();
import v1Routes from "./api/v1/";
appRoutes.use('/v1',v1Routes);

export default appRoutes;
