import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RankVideoData } from "../../client";
import { useSelectDate } from "../../hooks";
import { StoreType } from "../../redux/store";
import { fetchRankVideoDataByDate, getRankVideoDataList } from "../../redux/videoDataResponse";
import { convertDateToDisplayString, parseDate } from "../../utils/timeUtil";
import { RankList, VideoItemModal } from "../organisms";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BaseIconButton } from "../atoms";
import { CircularProgress } from "@material-ui/core";

const Home: FC = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state: StoreType) => state);
    const rankVideoDataList = getRankVideoDataList(selector);

    const {date, setNextDay, setPreviousDay} = useSelectDate();

    const [modalItem, setModalItem] = useState(undefined as RankVideoData|undefined);
    const [isOpenedModal, setIsOpenedModal] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

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
        dispatch(fetchRankVideoDataByDate(parseDate(date), setIsLoading, setIsError));
    }, [date]);
    
    return (
        <div className="flex flex-col items-center pt-6 pb-16 px-3">
            <h1 className="my-5 text-base sm:text-2xl font-bold">YouTube急上昇 & コメント解析WordCloud</h1>
            <p className="text-sm sm:text-base">
                毎日0時にYouTubeの急上昇動画を取得し、各動画コメント欄における出現頻度の高いワードを形態素解析とWordCloudを用いて可視化します。
            </p>
            <div className="flex items-center my-2 sm:mt-6">
                <BaseIconButton
                    text="前日"
                    icon={<BsChevronLeft/>}
                    className="w-11 h-11 sm:w-12 sm:h-12"
                    handleClick={()=>setPreviousDay(date)}
                />
                <span className="text-sm sm:text-base">
                    {convertDateToDisplayString(date, "yyyy年MM月dd日E曜日")}
                </span>
                <BaseIconButton
                    text="翌日"
                    icon={<BsChevronRight/>}
                    className="w-11 h-11 sm:w-12 sm:h-12"
                    handleClick={() => setNextDay(date)}
                />
            </div>
            {isLoading && <CircularProgress className="mt-14"/>}
            {isError && <p className="mt-14 text-red-800">データ取得に失敗しました</p>}
            {!isLoading && !isError && (
                rankVideoDataList.length === 0 ?
                (
                    <p className="mt-14 text-sm sm:text-base">
                        データが存在しません
                    </p>
                ):(
                    <RankList
                        items={rankVideoDataList}
                        handleOpenModal={handleOpenModal}
                    />
                )
            )}
            {modalItem && isOpenedModal &&
            <VideoItemModal
                item={modalItem}
                handleClose={handleCloseModal}
            />}
        </div>
    );
};

export default Home;