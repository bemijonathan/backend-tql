import { Router } from "express";
import controller from "../controller";
import routeValidators from "../validations";

const route = Router();

route.get("/howold", routeValidators.howOld, controller.getHowOld);

export default route;
