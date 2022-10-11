import { createSelector } from "reselect";
import { StoreType } from "../store";

const videoListSelector = (state: StoreType) => state.videoDataList;

export const getVideoDataList = createSelector (
    [videoListSelector],
    state => state
);