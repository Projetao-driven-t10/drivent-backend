import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import * as activitiesController from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
    .all("/*", authenticateToken)
    .get("", activitiesController.listActivities)
    .get("/:day", activitiesController.listActivitiesByDay)
    .post("", activitiesController.createActivity)
    .post("/subscription", activitiesController.createSubscription);

export { activitiesRouter };