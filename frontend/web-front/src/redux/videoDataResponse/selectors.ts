import { createSelector } from "reselect";
import { StoreType } from "../store";

const videoListSelector = (state: StoreType) => state.videoDataList;

export const getRankVideoDataList = createSelector (
    [videoListSelector],
    state => state
);