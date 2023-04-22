import { formatDate, getCurrentDate } from "./DateFormatter"

export const filterTodayConsultation = (array: any) => array.filter((schedule: any) => {
    return getCurrentDate() === formatDate(schedule.data.date)
})

export const filterAppliedConsultation = (array: any) => array.filter((schedule: any) => {
    return schedule.data.patient_email !== undefined
})

export const filterTodayAppliedConsultation = (array: any) => array.filter((schedule: any) => {
    return getCurrentDate() === formatDate(schedule.data.date)
    && schedule.data.patient_email !== undefined
})

