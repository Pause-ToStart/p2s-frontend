import { Task, Availability, ScheduledTasks } from "./generateSchedule";
export const unscheduledTasks: (Task|ScheduledTasks)[] = [];

export const availabilityTime : Availability = {
    startTime: null,
    endTime: null
}