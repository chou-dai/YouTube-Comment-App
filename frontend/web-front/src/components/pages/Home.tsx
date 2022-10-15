import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../redux/store";
import { fetchRankVideoDataByDate, getRankVideoDataList } from "../../redux/videoDataResponse";
import { parseDate } from "../../utils/timeUtil";

const Home: FC = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state: StoreType) => state);
    const rankVideoDataList = getRankVideoDataList(selector);

    useEffect(() => {
        const today = parseDate(new Date());
        dispatch(fetchRankVideoDataByDate(today));
    }, []);

    
    return (
        <div className="flex flex-col items-center">
            {rankVideoDataList.map(rankVideoData => {
                const videoData = rankVideoData.video;
                return (
                    <div key={videoData.id} className="mb-10 bg-purple-100 flex flex-col items-center">
                        <div>{rankVideoData.rank}</div>
                        <div>{rankVideoData.date}</div>
                        <div>{videoData.title}</div>
                        <div>{videoData.channel_name}</div>
                        <img src={videoData.thumbnail_url}/>
                        <iframe
                            width="560" height="315"
                            src={`https://www.youtube.com/embed/${videoData.id}?rel=0`}
                        ></iframe>
                        <div style={{whiteSpace: "pre-line"}}>{videoData.description}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;