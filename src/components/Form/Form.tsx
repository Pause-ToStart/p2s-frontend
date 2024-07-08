'use client'
import { useEffect, useState } from "react";
import React from 'react'
import { Task, Availability, ScheduledTasks } from "../../app/generateSchedule";

const Form = () => {
    const enum taskTypes {
        duration = 'duration', scheduled = 'scheduled'
    }
    const [availability, setAvailability] = useState({
        startTime: "9:00 am",
        endTime: "10:00 pm"
    })
    const [durationTask, setDurationTask] = useState({
        type: taskTypes.duration,
        name: "",
        duration: 0
    })
    const [taskList, setTaskList] = useState([])
    const [activeTaskTab, setActiveTaskTab] = useState<taskTypes>(taskTypes.duration)

    const handleAvailabilityChange = (e) =>
        {
            setAvailability((prevState) => ({...prevState, [e.target.name]: e.target.value}))
        }

    const renderAvailability = () => {
        return (
            <>
            <div>Availability</div>
            <label>start time </label>
            <input className="border-2" type="text" name="startTime" value={availability.startTime} onChange={handleAvailabilityChange}/>
            <label>end time </label>
            <input className="border-2" type="text" name="endTime" value={availability.endTime} onChange={handleAvailabilityChange}/>
            </>
        )

    }

    const createTask = (taskType) => {
        // TODO: can move this to time lib file - may need eslewhere
        const convertMinutesDurationToMillisecondsDuration = (minutesDuration) => {
            return minutesDuration * 60 * 1000
        }

        switch(taskType) {
            case taskTypes.duration: 
                const task : Task = {
                    name: durationTask.name,
                    duration: convertMinutesDurationToMillisecondsDuration(durationTask.duration)
                }
                setTaskList((prevList) => prevList.concat(durationTask))
                break;
            case taskTypes.scheduled:
                // const scheudledTask : ScheduledTasks = {
                //     name: taskName,
                //     startTime:
                // }
        }
    }

    const handleDurationTaskChange = (e) => {
        setDurationTask((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    const renderDurationTask = () => {
        return (
            <>
            <label>task name</label>
            <input className="border-2" type="text" name="name" value={durationTask.name} onChange={handleDurationTaskChange}/>
            <label>Duration in minutes</label>
            <input className="border-2" type="text" name="duration" value={durationTask.duration} onChange={handleDurationTaskChange}></input>
            <button className="bg-slate-500 text-white rounded" onClick={(e) => {e.preventDefault()
                createTask(taskTypes.duration)
            }}>submit</button>
            </>
        )
    }

    // const renderScheduledTask = () => {
    //     // todo: render scheduled task
    // }



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
                    {console.log("task item", index,  task)}
                    return(
                        <div key={`task-list-item-${index}`}>
                            <span>name: </span>
                            <span>{task.name }</span>
                            <span>duration: </span>
                            <span>{task.duration}</span>
                        </div>
                    )
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