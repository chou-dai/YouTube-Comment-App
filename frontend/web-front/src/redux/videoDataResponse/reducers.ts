import { RankVideoData } from "../../client";
import * as Actions from "./actions";

export const initialState: RankVideoData[] = [];

export const RankVideoListReducer = (state: RankVideoData[] = initialState, action: Actions.ActionType) => {
    switch(action.type) {
        case Actions.FETCH_VIDEO_LIST:
            return [
                ...action.payload
            ];
        default:
            return state;
    }
};