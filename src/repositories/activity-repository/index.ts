import { prisma } from "@/config";

export async function listActivities() {
    return prisma.activity.findMany();
}

export async function listActivitiesOfDay(date: Date) {
    return prisma.activity.findMany({
        where: {
            start: {
                gte: new Date(date), 
                lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
            }
        }
    });
}

export async function createSubscription(userId: number, activityId: number){
    return prisma.subscription.create({
        data: {
            userId,
            activityId
        }
    })
}