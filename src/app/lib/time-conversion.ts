export const convertMinutesDurationToMillisecondsDuration = (minutesDuration) => {
    return minutesDuration * 60 * 1000
}

export const convertStringtoDateTime = (timeString, day) => {
    const addDays = (date, days) => {
        const newDate = new Date(date)
        newDate.setDate(date.getDate() + days)
        return newDate
    }
    const [time, indicator] = timeString.split(" ")
    let [h, m] = time.split(":")
    if (indicator == "pm") {
        h = parseInt(h) + 12
    }
    const currentDate = new Date()
    currentDate.setHours(h,m)
    if(day.tomorrow) {
        const tomorrowsDate = addDays(currentDate, 1)
        return tomorrowsDate
    }
    else return currentDate
}

  export function formatTime(date: Date): string {
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const indicator = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${indicator}`;
    }
