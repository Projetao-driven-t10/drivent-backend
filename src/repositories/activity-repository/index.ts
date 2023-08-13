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
        where: {
            day : day
        },
        include: {
            Subscription: true
        }
    });
}

export async function createActivity(name: string, day: string, start: string, end: string, vacancies: number, place: string){
    return prisma.activity.create({
        data: {
            name,
            day,
            start,
            end,
            vacancies,
            place,
            updatedAt: new Date()
        }
    })
}
export async function createSubscription(userId: number, activityId: number){
    return prisma.subscription.create({
        data: {
            userId,
            activityId
        }
    })
}

export async function listUserActivities (userId: number){
    return prisma.subscription.findMany({
        where: {
            userId
        },
        include: {
            Activity: true
        }
    })
}

export async function findActivityById (id: number){
    return prisma.activity.findUnique({
        where: {
            id
        },
        include: {
            Subscription: true
        }
    })
}