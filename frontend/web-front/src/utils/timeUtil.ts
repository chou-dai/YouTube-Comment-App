import {format} from "date-fns";

/**
 * Date型をISOStringに変換する
 * toISOString()は意図せずUTCになることがあるため用いない
 * @param date
 * @returns
 */
export function parseDate(date: Date) {
    return format(date, "yyyy-MM-dd");
}