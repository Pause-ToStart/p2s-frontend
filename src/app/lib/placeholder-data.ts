import { Availability, Task, generateSchedule } from "../generateSchedule";
import { TaskTypes } from "./enum/tasktypes";
export const availabilityOne: Availability = {
  startTime: new Date("2024-07-02T09:00:00"), // Wednesday, July 2nd at 9:00 AM
  endTime: new Date("2024-07-02T17:00:00"), // Wednesday, July 2nd at 5:00 PM
};

export const availabilityTwo: Availability = {
  startTime: new Date("2024-07-02T10:00:00"), // Thursday, July 3rd at 10:00 AM
  endTime: new Date("2024-07-02T14:00:00"), // Thursday, July 3rd at 2:00 PM
};

export const testTasks: Task[] = [
  {
    taskType: TaskTypes.scheduled,
    name: "Brainstorming Session",
    startTime: new Date("2024-07-02T15:00:00"), // Wednesday, July 2nd at 3:00 PM
    endTime: new Date("2024-07-02T16:30:00"), //
  }, 
  {
    taskType: TaskTypes.scheduled,
    name: "Meeting with Team A",
    startTime: new Date("2024-07-02T11:00:00"), // Wednesday, July 2nd at 11:00 AM
    endTime: new Date("2024-07-02T12:30:00"),
  },
  {
    taskType: TaskTypes.scheduled,
    name: "Work out session",
    startTime: new Date("2024-07-02T12:00:00"), 
    endTime: new Date("2024-07-02T13:30:00"),
  },
  {
    taskType: TaskTypes.duration,
    name: "Client Presentation",
    duration: 60, // 60 minutes
  },
  {
    taskType: TaskTypes.duration,
    name: "Code Review",
    duration: 30, // 30 minutes
  },
];

// console.log(generateSchedule(availabilityOne, testTasks))
// console.log("2nd Test")
// console.log(generateSchedule(availabilityTwo, testTasks))
