export const formatShortDate = (date) => {
    const formatDate = date?.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const formatMonth = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const formattedDate = [date.getFullYear(), formatMonth, formatDate].join("-");
    return formattedDate;
};