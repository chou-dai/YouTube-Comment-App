import { Dispatch } from "redux";
import { videoDataApi } from "../../client/clientWrapper";
import { fetchVideoListAction } from "./actions";

export const fetchRankVideoDataByDate = (date: string) => {
    return async(dispatch: Dispatch) => {
        const response = await videoDataApi.getDailyRankVideoDataList(date);
        dispatch(fetchVideoListAction(response.data));
    };
};