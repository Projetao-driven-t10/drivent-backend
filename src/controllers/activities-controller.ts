import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import * as activitiesService from "@/services/activities-service";

export async function listActivities (req: AuthenticatedRequest, res: Response) {
    const { day } = req.query as { day: string };

    return await activitiesService.listActivities(day);
}

export async function createSubscription (req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
}