import {format} from "date-fns";
import {ja} from "date-fns/locale";

export function parseDate(date: Date) {
    return format(date, "yyyy-MM-dd");
}

export function convertDateToDisplayString(date: Date, strFormat: string) {
    return format(date, strFormat, {locale: ja});
}