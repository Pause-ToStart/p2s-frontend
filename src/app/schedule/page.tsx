"use client";

import React, { useState } from "react";
import { Task, formatTime } from "../generateSchedule";
import { generateSchedule } from "../generateSchedule";
import { availabilityOne, testTasks } from "../lib/placeholder-data";

export default function DisplaySchedule() {
  const [schedule, setSchedule] = useState([]);

  const handleClick = () => {
    setSchedule(generateSchedule(availabilityOne, testTasks));
  };

  return (
    <div className="flex flex-col items-center justify-between p-24">
        {schedule.length > 0 && (
        <ul>
          {schedule.map((task) => (
            <li key={task.name}>
              {formatTime(task.startTime)} {"-"} {formatTime(task.endTime)}
              {":"} {task.name}
            </li>
          ))}
        </ul>
      )}
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleClick}
      >
        Submit
      </button>
      
    </div>
  );
}
