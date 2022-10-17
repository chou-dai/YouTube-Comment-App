import {format} from "date-fns";
import {ja} from "date-fns/locale";

export const parseDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
};

export const convertDateToDisplayString = (date: Date, strFormat: string) => {
    return format(date, strFormat, {locale: ja});
};

export const calcDate = (date: Date, count:number) => {
    const returnDate = new Date(date);
    returnDate.setDate(returnDate.getDate() + count);
    return returnDate;
};