import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RankVideoData } from "../../client";
import { useSelectDate } from "../../hooks";
import { StoreType } from "../../redux/store";
import { fetchRankVideoDataByDate, getRankVideoDataList } from "../../redux/videoDataResponse";
import { convertDateToDisplayString, parseDate } from "../../utils/timeUtil";
import { RankList, VideoItemModal } from "../organisms";
import { BsCalendarCheck, BsCalendarWeek, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BaseIconButton } from "../atoms";

const Home: FC = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state: StoreType) => state);
    const rankVideoDataList = getRankVideoDataList(selector);

    const {date, setNextDay, setToday, setPreviousDay} = useSelectDate();

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
        <div className="flex flex-col items-center py-6 px-3">
            <h1 className="my-5 text-2xl font-bold">YouTube急上昇 & コメント解析WordCloud</h1>
            <p>毎日0時にYouTubeの急上昇動画を取得し、各動画のコメント欄の出現頻度の高いワードを形態素解析を用いて算出して表示します。</p>
            <div className="flex items-center mt-6">
                <BaseIconButton
                    text="前日"
                    icon={<BsChevronLeft/>}
                    handleClick={()=>setPreviousDay(date)}
                />
                <span>{convertDateToDisplayString(date, "yyyy年MM月dd日E曜日")}</span>
                <BaseIconButton
                    text="翌日"
                    icon={<BsChevronRight/>}
                    handleClick={() => setNextDay(date)}
                />
            </div>
            {rankVideoDataList.length !== 0 &&
            <RankList
                items={rankVideoDataList}
                handleOpenModal={handleOpenModal}
            />}
            {modalItem && isOpenedModal &&
            <VideoItemModal
                item={modalItem}
                handleClose={handleCloseModal}
            />}
        </div>
    );
};

export default Home;