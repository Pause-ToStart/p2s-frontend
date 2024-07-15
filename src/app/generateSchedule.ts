import { TaskTypes } from "./lib/enum/tasktypes";
export interface Availability {
  startTime: Date; 
  endTime: Date; 
}

export interface Task {
  taskType: TaskTypes;
  name: string;
  duration?: number; 
  startTime?: Date;
  endTime?: Date; 
}

export interface ScheduledTasks {
  taskType: TaskTypes;
  name: string; 
  startTime: Date;  
  endTime: Date; 
}

export function generateSchedule(availability: Availability, tasks: Task[]): Task[] {
  const scheduledTasks: ScheduledTasks[] = [];
  const tasksWithDuration: Task[] = [];

  for (const task of tasks) {
    if (task.startTime && task.endTime) {
      // task fits within availability and doesn't overlap existing tasks
      if (isTaskValid(task.startTime, task.endTime, availability, scheduledTasks)) {
        scheduledTasks.push({taskType: TaskTypes.scheduled, name: task.name, startTime: task.startTime, endTime: task.endTime});
      } else {
          // later on we can return the unscheduledTasks 
        console.warn(`Task '${task.name}' conflicts with availability or other tasks.`);
      }
    } else {
      tasksWithDuration.push(task); // Add tasks with duration to a separate list
    }
  }

    scheduledTasks.sort((a,b) => a.startTime.getTime() - b.startTime.getTime()); 

  for (const task of tasksWithDuration) {
    const durationTaskScheduled = scheduleTaskWithDuration(task, availability, scheduledTasks)
    durationTaskScheduled ? scheduledTasks.push(durationTaskScheduled) : console.warn(`Couldn't find a slot for task '${task.name}' with duration ${task.duration} minutes.`);
  }

  scheduledTasks.sort((a,b) => a.startTime.getTime() - b.startTime.getTime()); 

  return scheduledTasks;
}


function isTaskValid(taskStart: Date, taskEnd: Date, availability: Availability, schedule: ScheduledTasks[]): boolean {
  return taskStart >= availability.startTime && taskEnd <= availability.endTime &&
  schedule.every(existingTask => {
    return (taskStart >= existingTask?.endTime || taskEnd <= existingTask?.startTime);
  });
}

function scheduleTaskWithDuration(task: Task, availability: Availability, scheduledTasks: ScheduledTasks[]): ScheduledTasks | null {
  const taskDuration = task.duration! * 60 * 1000;

   for(let startTime = availability.startTime; startTime < availability.endTime; startTime = new Date(startTime.getTime() + 15 * 60 * 1000)) {
    const endTime = new Date(startTime.getTime() + taskDuration); 

    if(isTaskValid(startTime, endTime, availability, scheduledTasks)) 
      {
        const newScheduledTask = {taskType: TaskTypes.scheduled, name: task.name, startTime, endTime}
        return newScheduledTask; 
    }
   }

  return null 
}


