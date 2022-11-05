import { Dispatch } from "redux";
import { videoDataApi } from "../../client/clientWrapper";
import { fetchVideoListAction } from "./actions";

export const fetchRankVideoDataByDate = (date: string,
                                        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                        setIsError: React.Dispatch<React.SetStateAction<boolean>>) => {
    return async(dispatch: Dispatch) => {
        setIsError(false);
        setIsLoading(true);
        videoDataApi.getDailyRankVideoDataList(date)
            .then((response) => {
                dispatch(fetchVideoListAction(response.data));
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
};