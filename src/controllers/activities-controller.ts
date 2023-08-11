import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import * as activitiesService from "@/services/activities-service";

export async function listActivities (req: AuthenticatedRequest, res: Response) {
    try {
        const result =  await activitiesService.listActivities();
        console.log(result);
        return res.send(result);
    }catch(err) {
        console.log(err);
        return res.send(err);
    }
}

export async function listActivitiesByDay (req: AuthenticatedRequest, res: Response) {
    const day = req.params.day;

    try {
        const result =  await activitiesService.listActivitiesByDay(day);
        console.log(result);
        return res.send(result);
    }catch(err) {
        console.log(err);
        return res.send(err);
    }
}

export async function createSubscription (req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
}