import { Router } from "express";
import * as infoController from "../controllers/infoController.js"
import { generateMiddleware } from "../middleware/generatedMiddleware";
import { signupSchema } from "../validations/userInfoValidations.js";

const infoRoute = Router();
infoRoute.post("/",  generateMiddleware(signupSchema), infoController.addUserToDatabase)
export default infoRoute