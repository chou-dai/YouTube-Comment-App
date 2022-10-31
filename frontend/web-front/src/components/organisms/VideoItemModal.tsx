import React, {FC, useEffect, useState} from "react";
import WordCloud from "react-d3-cloud";
import { RankVideoData } from "../../client";
import { Datum } from "../../../types/wordCloudDataType";
import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import { BsChevronDown, BsPersonCircle } from "react-icons/bs";

type Props = {
    item: RankVideoData;
    handleClose: () => void;
}

const RankListItem: FC<Props> = (props: Props) => {
    const {item, handleClose} = props;
    const [wordCloudData, setWordCloudData] = useState<Datum[]>([]);

    useEffect(()=>{
        const data = item.video.comments?.map((comment): Datum => {
            return {
                text: comment.word as string,
                value: comment.count as number
            };
        });
        setWordCloudData(data as Datum[]);
    }, []);

    return (
        <>
            <div className="bg-black overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0
                    z-50 w-full md:inset-0 h-modal md:h-full flex items-center bg-opacity-70"
            >
                <div className="absolute w-full h-full cursor-pointer"
                    onClick={handleClose}
                />
                <div className="relative w-[700px] h-full md:h-auto mx-auto">
                    <div className="relative rounded shadow bg-white p-6 max-h-[90vh] overflow-scroll">
                        <div className="flex flex-col items-center">
                            {/* <div>{item.rank}</div> */}
                            {/* <div>{item.date}</div> */}
                            <div>{item.video.title}</div>
                        </div>
                        <WordCloud
                            data={wordCloudData}
                            fontSize={(word) => Math.log2(word.value) * 40}
                        />
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<BsChevronDown />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                              <p>動画詳細</p>
                            </AccordionSummary>
                            <AccordionDetails className="flex-col">
                                <div>
                                    <p>{item.date}</p>
                                    <p>{item.rank}位</p>
                                </div>
                                <p>チャンネル名： {item.video.channel_name}</p>
                                <iframe
                                    width="100%"
                                    className="bg-black aspect-video"
                                    src={`https://www.youtube.com/embed/${item.video.id}?rel=0`}
                                />
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RankListItem;