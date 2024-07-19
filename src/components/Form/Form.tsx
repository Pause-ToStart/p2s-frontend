'use client'
import { useState } from "react";
import React from 'react'
import { useRouter } from "next/navigation";
import { Task, ScheduledTasks } from "../../app/lib/generateSchedule";
import { convertStringtoDateTime } from "../../app/lib/time-conversion";
import { formatTime } from "../../app/lib/time-conversion";
import { TaskTypes } from "../../app/lib/enum/taskTypes";
import { unscheduledTasks, availabilityTime } from "../../app/lib/tasks";

const Form = () => {
    const router = useRouter()
    const enum TimeShown {
        current,
        tomorrow
    }

    const [availabilityForm, setAvailabilityForm] = useState({
        startTime: "9:00 am",
        endTime: "10:00 pm"
    })
    const [durationTaskForm, setDurationTaskForm] = useState({
        type: TaskTypes.duration,
        name: "",
        duration: ""
    })
    const [scheduledTaskForm, setScheduledTaskForm] = useState({
        type: TaskTypes.scheduled,
        name: "",
        startTime: "",
        endTime: "",
    })
    const [taskList, setTaskList] = useState<(any)[]>([])
    const [activeTaskTab, setActiveTaskTab] = useState<TaskTypes>(TaskTypes.duration)

    const handleAvailabilityChange = (e) =>
        {
            setAvailabilityForm((prevState) => ({...prevState, [e.target.name]: e.target.value}))
        }

    const renderAvailability = () => {
        return (
            <>
            <div>Availability</div>
            <label>start time </label>
            <input className="border-2" type="text" name="startTime" placeholder="9:00 am" value={availabilityForm.startTime} onChange={handleAvailabilityChange}/>
            <label>end time </label>
            <input className="border-2" type="text" name="endTime" placeholder="10:00 pm"value={availabilityForm.endTime} onChange={handleAvailabilityChange}/>
            </>
        )

    }

    const addTaskToList = (taskType) => {

        switch(taskType) {
            case TaskTypes.duration:
                const durationTask : Task = {
                    taskType: durationTaskForm.type,
                    name: durationTaskForm.name,
                    duration: parseInt(durationTaskForm.duration)
                }
                setTaskList((prevList) => prevList.concat(durationTask))
                setDurationTaskForm({...durationTaskForm, name:"", duration:""})
                break;
            case TaskTypes.scheduled: 
                const scheduledTask = {
                    taskType: scheduledTaskForm.type,
                    name: scheduledTaskForm.name,
                    startTime: convertStringtoDateTime(scheduledTaskForm.startTime, TimeShown.tomorrow),
                    endTime: convertStringtoDateTime(scheduledTaskForm.endTime, TimeShown.tomorrow)
                }
                setTaskList((prevList) => prevList.concat(scheduledTask))
                setScheduledTaskForm({...scheduledTaskForm, name: "", startTime: "", endTime: ""})
                break;
        }
    }

    const handleDurationTaskChange = (e) => {
        setDurationTaskForm((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    const renderDurationTask = () => {
        return (
            <div>
            <label>task name </label>
            <input className="border-2" type="text" name="name" placeholder="workout" value={durationTaskForm.name} onChange={handleDurationTaskChange}/>
            <label>Duration in minutes</label>
            <input className="border-2" type="text" name="duration" placeholder="60" value={durationTaskForm.duration} onChange={handleDurationTaskChange}></input>
            <button className="bg-slate-500 text-white rounded" onClick={(e) => {e.preventDefault()
                addTaskToList(TaskTypes.duration)
            }}>add duration task</button>
            </div>
        )
    }

    const handleScheduledTaskChange = (e) => {
        setScheduledTaskForm((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    const renderScheduledTask = () => {
        return(
            <div>
            <label>Task name </label>
            <input className="border-2" type="text" name="name" placeholder="workout" value={scheduledTaskForm.name} onChange={handleScheduledTaskChange}/>
            <label>Start Time</label>
            <input className="border-2" type="text" name="startTime" placeholder="3:00 pm" value={scheduledTaskForm.startTime} onChange={handleScheduledTaskChange}></input>
            <label>End Time</label>
            <input className="border-2" type="text" name="endTime" placeholder="3:30 pm" value={scheduledTaskForm.endTime} onChange={handleScheduledTaskChange}></input>
            <button className="bg-slate-500 text-white rounded" onClick={(e) => {
                e.preventDefault()
                addTaskToList(TaskTypes.scheduled)
            }}>add scheduled task</button>
            </div>
        )
    }

    const renderCreateTask = () => {
        const tabs = [TaskTypes.duration, TaskTypes.scheduled]

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
        {activeTaskTab === TaskTypes.duration ? renderDurationTask() :renderScheduledTask()}
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
                    return(
                        <div key={`task-list-item-${index}`}>
                            <span>{`Type: ${task.taskType} - `}</span>
                            <span>{`Name: ${task.name} - `}</span>
                            {task.hasOwnProperty(TaskTypes.duration) ? 
                                <span>{`duration: ${task.duration}`}</span>
                                : <><span>{`start time: ${formatTime(task.startTime)}`}</span> <span>{`end time: ${formatTime(task.endTime)}`}</span></>
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
        availabilityTime.startTime = convertStringtoDateTime(availabilityForm.startTime, TimeShown.tomorrow)
        availabilityTime.endTime = convertStringtoDateTime(availabilityForm.endTime, TimeShown.tomorrow) 
        unscheduledTasks.push(...taskList)
        router.push('/schedule')
    }

    return (
        <>
        <div>Form</div>
        <form>
            {renderAvailability()}
            {renderCreateTask()}
            {renderTaskList()}
            <button className="bg-slate-500 text-white rounded" 
                onClick={(e) => {
                    e.preventDefault()
                    handleSubmitTasks()
                }}>submit tasks and view schedule
            </button>
        </form>
        </>
    )
}

export default Form;