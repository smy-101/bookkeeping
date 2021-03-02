import dayjs from 'dayjs';

const days = (month: string) => {
    const day = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
    if (dayjs(month).daysInMonth() === 28) {
        return day;
    } else if (dayjs(month).daysInMonth() === 29) {
        return [...day, '29'];
    } else if (dayjs(month).daysInMonth() === 30) {
        return [...day, '29', '30'];
    } else if (dayjs(month).daysInMonth() === 31) {
        return [...day, '29', '30', '31'];
    }
};

export {days}