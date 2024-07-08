'use client'
import { useState } from "react";
import React from 'react'
import { Task, Availability, ScheduledTasks } from "../../app/generateSchedule";

const Form = () => {
    const enum taskTypes {
        duration = 'duration', scheduled = 'scheduled'
    }

    const [startTime , setStartTime] = useState<string>("9:00 am");
    const [endTime, setEndTime] = useState<string>("10:00 pm")
    const [taskList, setTaskList] = useState([])
    const [taskName, setTaskName] = useState('test')
    const [taskDurationMinutes, setTaskDurationMinutes] = useState<string>('30')
    const [taskStartTime, setTaskStartTime] = useState()
    const [taskEndTime, setTaskEndTime] = useState()
    const [durationTask, setDurationTask] = useState()
    const [scheduledTask, setScheduledTask] = useState()
    const [activeTaskTab, setActiveTaskTab] = useState<taskTypes>(taskTypes.duration)

    console.log("taskList", taskList)


    const renderAvailability = () => {
        return (
            <>
            <div>Availability</div>
            <label>start time </label>
            <input className="border-2" type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
            <label>end time </label>
            <input className="border-2" type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
            </>
        )

    }
    const createTask = () => {
        // TODO: can move this to time lib file - may need eslewhere
        const convertMinutesDurationToMillisecondsDuration = (minutesDuration) => {
            return minutesDuration * 60 * 1000
        }

        switch(activeTaskTab) {
            case taskTypes.duration: 
                const durationTask : Task = {
                    name: taskName,
                    duration: convertMinutesDurationToMillisecondsDuration(taskDurationMinutes)
                }
                setTaskList(taskList.concat(durationTask))
                console.log("taskList", taskList)
                break;
            case taskTypes.scheduled:
                // const scheudledTask : ScheduledTasks = {
                //     name: taskName,
                //     startTime:
                // }
        }
    }

    const renderDurationTask = () => {
        return (
            <>
            <label>Duration in minutes</label>
            <input className="border-2" type="text" value={taskDurationMinutes} onChange={(e) => setTaskDurationMinutes(e.target.value)}></input>
            <button className="bg-slate-500 text-white rounded" onClick={() => {
                createTask()
            }}>submit</button>
            </>
        )
    }

    const renderScheduledTask = () => {
        // todo: render scheduled task
    }



    const renderCreateTask = () => {
        const tabs = [taskTypes.duration]

        return (
        <>
        <div>createTask</div>
        <div>
            <span>Task Type: </span>
            {tabs.map((tab, index) => {
                return(
                    <span key={`tab-${index}`}> {tab} </span>
                )
            })}
             </div>
        <label>task name</label>
        <input className="border-2" type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
        {renderDurationTask()}
        </>
        )

    }

    const renderTaskList = () => {
        const renderEmptyTaskList =() => {
            return(
                <div>there are no tasks</div>
            )
        }

        const renderTasks = () => {
            return (
                <>
                {taskList.map((task, index) => {
                    <div key={`task-list-${index}`}>{task.name}</div>
                })}
                </>
            )
        }

        return (
        <>
        <div>Tasks</div>
        {(taskList.length === 0 ? renderEmptyTaskList() : renderTasks()) }
        </>
        )
    }

    return (
        <>
        <div>form</div>
        <form>
            {renderAvailability()}
            {renderCreateTask()}
            {renderTaskList()}
        </form>
        </>
    )
}

export default Form;