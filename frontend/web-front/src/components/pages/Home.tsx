import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RankVideoData } from "../../client";
import { StoreType } from "../../redux/store";
import { fetchRankVideoDataByDate, getRankVideoDataList } from "../../redux/videoDataResponse";
import { parseDate } from "../../utils/timeUtil";
import { VideoItemModal } from "../molecules";
import { RankList } from "../organisms";

const Home: FC = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state: StoreType) => state);
    const rankVideoDataList = getRankVideoDataList(selector);

    const [modalItem, setModalItem] = useState(undefined as RankVideoData|undefined);
    const [isOpenedModal, setIsOpenedModal] = useState(false);

    // モーダルを開く
    const handleOpenModal = (item: RankVideoData) => {
        setModalItem(item);
        setIsOpenedModal(true);
    };

    // モーダルを閉じる
    const handleCloseModal = () => {
        setIsOpenedModal(false);
    };

    // 初回レンダリング時：当日のランキングデータを取得
    useEffect(() => {
        const today = parseDate(new Date());
        dispatch(fetchRankVideoDataByDate(today));
    }, []);
    
    return (
        <div className="flex flex-col items-center">
            <RankList
                items={rankVideoDataList}
                handleOpenModal={handleOpenModal}
            />
            {modalItem !== undefined &&
            <VideoItemModal
                isOpened={isOpenedModal}
                item={modalItem}
                handleClose={handleCloseModal}
            />}
        </div>
    );
};

export default Home;