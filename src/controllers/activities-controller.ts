import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import * as activitiesService from "@/services/activities-service";

export async function listActivities (req: AuthenticatedRequest, res: Response) {
    const result =  await activitiesService.listActivities();
    console.log(result);
    return res.status(httpStatus.OK).send(result);
}

export async function listActivitiesByDay (req: AuthenticatedRequest, res: Response) {
    const day = req.params.day;

    const result =  await activitiesService.listActivitiesByDay(day);
    console.log(result);
    return res.status(httpStatus.OK).send(result);
}
export async function createActivity (req: AuthenticatedRequest, res: Response) {
    await activitiesService.createActivity(req.body);

}
export async function createSubscription (req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { activityId } = req.body as { activityId: number };

    const subscription = await activitiesService.createSubscription(userId, activityId);
    return res.status(httpStatus.CREATED).send(subscription);
}