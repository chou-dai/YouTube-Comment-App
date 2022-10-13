import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../redux/store";
import { fetchVideoDataByCreatedAt, getVideoDataList } from "../../redux/videoDataResponse";
import { parseDate } from "../../utils/timeUtil";

const Home: FC = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state: StoreType) => state);
    const videoDataList = getVideoDataList(selector);

    useEffect(() => {
        const today = parseDate(new Date());
        dispatch(fetchVideoDataByCreatedAt(today));
    }, []);

    
    return (
        <div className="flex flex-col items-center">
            {videoDataList.map(videoData => {
                return (
                    <div key={videoData.id}>
                        <div>{videoData.title}</div>
                        <div>{videoData.channel_name}</div>
                        <img src={videoData.thumbnail_url}/>
                        <div style={{whiteSpace: "pre-line"}}>{videoData.description}</div>
                        <a href={`https://www.youtube.com/watch?v=${videoData.id}`}>YouTubeリンク</a>
                        <br></br>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;