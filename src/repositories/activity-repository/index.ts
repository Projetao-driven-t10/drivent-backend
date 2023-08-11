import { prisma } from "@/config";
import { date } from "joi";

export async function listActivities() {
    return prisma.activity.findMany();
}

export async function listActivitiesDays() {
    return prisma.activity.groupBy({
        by: ['day'],
    });
}

export async function listActivitiesByDay(day : string) {
    return prisma.activity.findMany({
        where: {day : day},
    });
}
// export async function listActivitiesOfDay() {
//     return prisma.activity.groupBy({
//         // prisma reclama mas retorna as atividades certas
//         by : ["day"],
//     });
// }

export async function createSubscription(userId: number, activityId: number){
    return prisma.subscription.create({
        data: {
            userId,
            activityId
        }
    })
}