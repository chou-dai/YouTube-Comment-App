import { VideoData } from "../../client";
import * as Actions from "./actions";

export const initialState: VideoData[] = [];

export const VideoListReducer = (state: VideoData[] = initialState, action: Actions.ActionType) => {
    switch(action.type) {
        case Actions.FETCH_VIDEO_LIST:
            return [
                ...action.payload
            ];
        default:
            return state;
    }
};