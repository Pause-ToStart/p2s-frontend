'use client'
import { act, useEffect, useState } from "react";
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
        name: "test",
        duration: "30",
    })

    const [scheduledTask, setScheduledTask] = useState({
        type: taskTypes.scheduled,
        name: "scheduled test",
        startTime: "3:00 pm",
        endTime: "3:30 pm"
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

    const handleDurationTaskChange = (e) => {
        setDurationTask((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    const renderDurationTask = () => {
        return (
            <div>
            <label>task name </label>
            <input className="border-2" type="text" name="name" value={durationTask.name} onChange={handleDurationTaskChange}/>
            <label>Duration in minutes</label>
            <input className="border-2" type="text" name="duration" value={durationTask.duration} onChange={handleDurationTaskChange}></input>
            <button className="bg-slate-500 text-white rounded" onClick={(e) => {e.preventDefault()
                const task  = {
                    type: durationTask.type,
                    name: durationTask.name,
                    duration: durationTask.duration
                }
                setTaskList((prevList) => prevList.concat(task))
            }}>add duration task</button>
            </div>
        )
    }

    const handleScheduledTaskChange = (e) => {
        setScheduledTask((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    const renderScheduledTask = () => {
        return(
            <div>
            <label>Task name </label>
            <input className="border-2" type="text" name="name" value={scheduledTask.name} onChange={handleScheduledTaskChange}/>
            <label>Start Time</label>
            <input className="border-2" type="text" name="startTime" value={scheduledTask.startTime} onChange={handleScheduledTaskChange}></input>
            <label>End Time</label>
            <input className="border-2" type="text" name="endTime" value={scheduledTask.endTime} onChange={handleScheduledTaskChange}></input>
            <button className="bg-slate-500 text-white rounded" onClick={(e) => {e.preventDefault()
                const task = {
                    type: scheduledTask.type,
                    name: scheduledTask.name,
                    startTime: scheduledTask.startTime,
                    endTime: scheduledTask.endTime
                }
                setTaskList((prevList) => prevList.concat(task))
            }}>add scheduled task</button>
            </div>
        )
    }

    const renderCreateTask = () => {
        const tabs = [taskTypes.duration, taskTypes.scheduled]

        return (
        <>
        <div>createTask</div>
        <div>
            <span>Task Type: </span>
            {tabs.map((tab, index) => {
                return(
                    <button key={`tab-${index}`}className={activeTaskTab === tab ? "text-blue-600" : ""} onClick={(e) => {e.preventDefault()
                        setActiveTaskTab(tab)
                    }}> { tab } </button>
                )
            })}
        </div>
        {activeTaskTab === taskTypes.duration ? renderDurationTask() :renderScheduledTask()}
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
                            <span>{`Type: ${task.type} - `}</span>
                            <span>{`Name: ${task.name} - `}</span>
                            {task.type === taskTypes.duration ? 
                                <span>{`duration: ${task.duration}`}</span>
                                : <><span>{`start time: ${task.startTime}`}</span> <span>{`end time: ${task.endTime}`}</span></>
                            }
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

    const handleSubmitTasks = () => {
        // TODO:
        /*
        resets form
        converts string formats to date formats - can possibly add string AND date format to obj!
        displays schedule
        */
    }

    return (
        <>
        <div>Form</div>
        <form>
            {renderAvailability()}
            {renderCreateTask()}
            {renderTaskList()}
            <button className="bg-slate-500 text-white rounded">submit tasks</button>
        </form>
        </>
    )
}

export default Form;