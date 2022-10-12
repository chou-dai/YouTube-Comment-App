import { Dispatch } from "redux";
import { videoDataApi } from "../../client/clientWrapper";
import { fetchVideoListAction } from "./actions";

export const fetchVideoDataByCreatedAt = (createdAt: string) => {
    return async(dispatch: Dispatch) => {
        const response = await videoDataApi.getVideoDataList(createdAt);
        dispatch(fetchVideoListAction(response.data));
    };
};