import React, {FC, useEffect, useState} from "react";
import WordCloud from "react-d3-cloud";
import { RankVideoData } from "../../client";
import { Datum } from "../../../types/wordCloudDataType";
import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import { BsChevronDown } from "react-icons/bs";
import { convertDateToDisplayString } from "../../utils/timeUtil";

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
        if(data?.length == 0) setWordCloudData(
            [{
                text: "データが存在しません",
                value: 2,
                
            }]
        );
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
                            <div className="text-xl mb-6">{item.video.title}</div>
                        </div>
                        <div>
                            <WordCloud
                                data={wordCloudData}
                                fontSize={word => Math.log2(word.value) * 40}
                                // rotate={word => (word.value % 90) - 45}
                            /> 
                        </div>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<BsChevronDown />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                              <p>動画詳細</p>
                            </AccordionSummary>
                            <AccordionDetails className="flex-col">
                                <div className="flex text-lg mb-3">
                                    <p>{convertDateToDisplayString(new Date(item.date), "yyyy/MM/dd")}</p>
                                    <p className="ml-4">{item.rank}位</p>
                                </div>
                                <div className="flex mb-3">
                                    <p>チャンネル名： </p>
                                    <p>{item.video.channel_name}</p>
                                </div>
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