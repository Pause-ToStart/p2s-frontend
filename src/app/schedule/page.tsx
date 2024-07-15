"use client";

import React, { useState, useEffect } from "react";
import { formatTime } from "../lib/time-conversion";
import { generateSchedule } from "../generateSchedule";
import { availabilityTime, unscheduledTasks } from "../lib/tasks";
import { useRouter } from "next/navigation";


export default function DisplaySchedule() {
  const router = useRouter()
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    setSchedule(generateSchedule(availabilityTime, unscheduledTasks));
  }, [])

  const handleClick = () => {
    availabilityTime.startTime = null;
    availabilityTime.endTime = null;
    unscheduledTasks.length = 0
    router.push('/')
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
        create new schedule
      </button>
      
    </div>
  );
}
