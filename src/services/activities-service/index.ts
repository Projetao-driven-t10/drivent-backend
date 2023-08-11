import * as activitiesRepository from "@/repositories/activity-repository";
export async function listActivities (){
    return await activitiesRepository.listActivitiesDays();
}

export async function listActivitiesByDay (day : string){
    return await activitiesRepository.listActivitiesByDay(day);
}

export async function createSubscription(userId: number, activityId: number){
    //checar se a atividade já está esgotada
    // checar se o usuário não tem nenhuma atividade que aconteça simultaneamente
    // return await activitiesRepository.createSubscription(userId, activityId);
}