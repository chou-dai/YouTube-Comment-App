import { RankVideoData } from "../../client";

export interface ActionType {
    type: string;
    payload: RankVideoData[];
}

export const FETCH_VIDEO_LIST = "FETCH_VIDEO_LIST";
export const fetchVideoListAction = (videoDataList: RankVideoData[]) => {
    return {
        type: FETCH_VIDEO_LIST,
        payload: videoDataList
    };
};