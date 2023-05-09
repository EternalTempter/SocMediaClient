import { toast } from "react-toastify";

export const isValidFileUploaded = (file) => {
    const validExtensions = ['png','jpeg','jpg']
    const fileExtension = file.type.split('/')[1]
    return validExtensions.includes(fileExtension)
}

export function generateArrayOfDays() {
    let values:number[] = [];
    for(let i = 1; i <= 31; i++) {
        values.push(i);
    } 
    return values;
}
export function generateArrayOfYears() {
    let values:number[] = [];
    let currentDate = new Date();
    for(let i = Number(currentDate.getFullYear()) - 100; i <= Number(currentDate.getFullYear()) - 18; i++) {
        values.push(i);
    } 
    return values.reverse();
}

export function getDaysCountSinceRegistration(registrationDate) {
    let currentDate = new Date();
    return Math.floor((Number(currentDate) - Number(new Date(registrationDate))) / 1000 / 60 / 60 / 24);
}

export function getFormattedDate(unformattedDate) {
    let formattedString = String(unformattedDate).replace('T', ' ').slice(0, 10).split('-');
    return new Date(Number(formattedString[0]), Number(formattedString[1]), Number(formattedString[2]));
}

export function getFormattedDateAndTimeForPost(unformattedDate) {
    let months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    let date = new Date(unformattedDate);
    let currentDate = new Date();
    let differenceBetweenDates = Number(currentDate) - Number(date);
    if((differenceBetweenDates / 1000) < 60) {
        let seconds = Math.floor(differenceBetweenDates / 1000);
        return `${seconds} ${declOfNum(seconds, ['секунду', 'секунды', 'секунд'])} назад`;
    }
    else if((differenceBetweenDates / 1000 / 60) < 60) {
        let minutes = Math.floor(differenceBetweenDates / 1000 / 60);
        return `${minutes} ${declOfNum(minutes, ['минуту', 'минуты', 'минут'])} назад`;
    }
    else if((currentDate.getDate() - date.getDate() === 0)) {
        return `Сегодня в ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;  
    }
    else if((currentDate.getDate() - date.getDate() === 1)) {
        return `Вчера в ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;   
    }
    else {
        return `
            ${addZero(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()} 
            в ${addZero(date.getHours())}:${addZero(date.getMinutes())}
        `;   
    }
}

export function addZero (number) {
    return (number < 10 ? '0' : '') + number;
}

export function declOfNum(n, text_forms) {  
    n = Math.abs(n) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

export function notifySuccess(message: string) {
    toast.success(message, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function notifyError(message: string) {
    toast.error(message, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function notifyAlert(message: string) {
    toast.warn(message, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}