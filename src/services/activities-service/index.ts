import * as activitiesRepository from "@/repositories/activity-repository";
import dayjs from "dayjs";
import { Activity, Subscription } from "@prisma/client";
import { conflictError } from "@/errors";
export async function listActivities (){
    return await activitiesRepository.listActivitiesDays();
}

export async function listActivitiesByDay (day : string){
    return await activitiesRepository.listActivitiesByDay(day);
}

function checkTimeOverlap (start: Date, end: Date, existingActivities: (Subscription & { Activity: Activity})[]) {
    for (const activity of existingActivities) {
        const existingStart = dayjs(activity.Activity.start);
        const existingEnd = dayjs(activity.Activity.end);

        const newStart = dayjs(start);
        const newEnd = dayjs(end);
  
        if (
            (newStart.isBefore(existingEnd) && newEnd.isAfter(existingStart)) ||
            (newStart.isSame(existingStart) && newEnd.isSame(existingEnd))
        ) {
            return true; // Sobreposição encontrada
        }
    }
  
    return false; // Sem sobreposição
  }

export async function createActivity (body: any){
    let {name, day, start, end, vacancies, place} = body;

    const startTime = dayjs(start).hour();
    const endTime = dayjs(end).hour();
    const startCorrected = dayjs(start).add(3, 'hour').format('HH:mm');
    if (startCorrected < "09:00") {
        throw conflictError("The activity must start at least 9:00 am!");
    }
    if (endTime - startTime < 1){
        throw conflictError("The activity must have at least 1 hour!");
    }

    return await activitiesRepository.createActivity(name, day, start, end, vacancies, place);
}
export async function createSubscription(userId: number, activityId: number){
    const userActivities = await activitiesRepository.listUserActivities(userId);
    const interestedActivity = await activitiesRepository.findActivityById(activityId);
    if (interestedActivity.vacancies === interestedActivity.Subscription.length){
        throw conflictError("This activity has no vacancies. Try another one!");
    }
    const overlap = checkTimeOverlap(interestedActivity.start, interestedActivity.end, userActivities);
    if (overlap){
        throw conflictError("This activity has a time overlap with a existing activity subscription!");
    }
    return await activitiesRepository.createSubscription(userId, activityId);
}