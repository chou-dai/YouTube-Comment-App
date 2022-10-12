import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../redux/store";
import { fetchVideoDataByCreatedAt, getVideoDataList } from "../../redux/videoDataResponse";

const Home: FC = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state: StoreType) => state);
    const videoDataList = getVideoDataList(selector);

    useEffect(() => {
        dispatch(fetchVideoDataByCreatedAt("2022-10-10"));
    },[]);
    return (
        <div className="flex flex-col items-center">
            {videoDataList.map(videoData => {
                return (
                    <div key={videoData.id}>
                        <div>{videoData.title}</div>
                        <div>{videoData.description}</div>
                        <div>{videoData.channel_name}</div>
                        <img src={videoData.thumbnail_url}/>
                        <a href={`https://www.youtube.com/watch?v=${videoData.id}`}>YouTubeリンク</a>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;