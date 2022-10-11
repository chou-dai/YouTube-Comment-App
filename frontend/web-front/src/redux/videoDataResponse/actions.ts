import { VideoData } from "../../client";

export interface ActionType {
    type: string;
    payload: VideoData[];
}

export const FETCH_VIDEO_LIST = "FETCH_VIDEO_LIST";
export const fetchVideoListAction = (videoDataList: VideoData[]) => {
    return {
        type: FETCH_VIDEO_LIST,
        payload: videoDataList
    };
};