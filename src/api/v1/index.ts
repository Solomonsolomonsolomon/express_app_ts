import { Router } from "express";
const v1:Router=Router();
import AuthRoutes from './routes/authRoutes'
v1.use(AuthRoutes)
export default v1;