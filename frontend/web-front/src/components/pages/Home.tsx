import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RankVideoData } from "../../client";
import { StoreType } from "../../redux/store";
import { fetchRankVideoDataByDate, getRankVideoDataList } from "../../redux/videoDataResponse";
import { convertDateToDisplayString, parseDate } from "../../utils/timeUtil";
import { VideoItemModal } from "../molecules";
import { RankList } from "../organisms";

const Home: FC = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state: StoreType) => state);
    const rankVideoDataList = getRankVideoDataList(selector);

    const [date, setDate] = useState(new Date());
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
    // date変更時：ランキングデータを取得
    useEffect(() => {
        dispatch(fetchRankVideoDataByDate(parseDate(date)));
    }, [date]);
    
    return (
        <div className="flex flex-col items-center">
            running this app
            <h1>
                {convertDateToDisplayString(date, "yyyy年MM月dd日E曜日")} YouTube急上昇
            </h1>
            {rankVideoDataList.length !== 0 &&
            <RankList
                items={rankVideoDataList}
                handleOpenModal={handleOpenModal}
            />}
            {modalItem &&
            <VideoItemModal
                isOpened={isOpenedModal}
                item={modalItem}
                handleClose={handleCloseModal}
            />}
        </div>
    );
};

export default Home;