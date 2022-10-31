import {useCallback, useState} from "react";
import { calcDate } from "../utils/timeUtil";

export const useSelectDate = () => {
    const [date, setDate] = useState(new Date());
    const setNextDay = useCallback((prevDate: Date) => {
        setDate(calcDate(prevDate, 1));
    }, []);
    const setPreviousDay = useCallback((prevDate: Date) => {
        setDate(calcDate(prevDate, -1));
    }, []);

    return {date, setNextDay, setPreviousDay};
};