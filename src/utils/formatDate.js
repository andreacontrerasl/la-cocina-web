import format from "date-fns/format"
import {parseISO}  from "date-fns"

export const formattedDate = (dateString) => {
    var date = new Date(dateString);

    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var dayOfWeek = daysOfWeek[date.getDay()];
    var dayOfMonth = date.getDate() + 1;
    var month = months[date.getMonth()];

    var formatDate = `${dayOfWeek}, ${dayOfMonth} ${month}`; 

    return(formatDate)

}



export const formatDate = (dateString, formatString) => {
    const timeZone = "America/Caracas"
    const adjustedDate = parseISO(dateString, { timeZone })
    return format(adjustedDate, formatString, {timeZone})
}