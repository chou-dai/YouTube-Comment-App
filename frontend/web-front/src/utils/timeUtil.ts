import {format} from "date-fns";

export function parseDate(date: Date) {
    return format(date, "yyyy-MM-dd");
}

export function convertDateToDisplayString(date: Date, strFormat: string) {
    return format(date, strFormat);
}