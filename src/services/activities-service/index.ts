import * as activitiesRepository from "@/repositories/activity-repository";
export async function listActivities (day: string){
    if (!day){
        return await activitiesRepository.listActivities();
    }
    const date = new Date(day);
    return await activitiesRepository.listActivitiesOfDay(date);
}

export async function createSubscription(userId: number, activityId: number){
    //checar se a atividade já está esgotada
    // checar se o usuário não tem nenhuma atividade que aconteça simultaneamente
    // return await activitiesRepository.createSubscription(userId, activityId);
}