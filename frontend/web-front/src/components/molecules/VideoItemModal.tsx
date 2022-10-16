import React, {FC, memo} from "react";
import { RankVideoData } from "../../client";

type Props = {
    isOpened: boolean;
    item: RankVideoData;
    handleClose: () => void;
}

const RankListItem: FC<Props> = memo(function rankListItem(props: Props) {
    const {isOpened, item, handleClose} = props;

    return (
        <>
        {isOpened &&
        <div className="bg-black overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0
                z-50 w-full md:inset-0 h-modal md:h-full flex items-center bg-opacity-70"
        >
            <div className="absolute w-full h-full cursor-pointer"
                onClick={handleClose}
            />
            <div className="relative w-[700px] h-full md:h-auto mx-auto">
                <div className="relative rounded shadow bg-white p-6">
                    <div className="flex flex-col items-center">
                        <div>{item.rank}</div>
                        <div>{item.date}</div>
                        <div>{item.video.title}</div>
                        <div>{item.video.channel_name}</div>
                        <iframe
                            width="560" height="315"
                            src={`https://www.youtube.com/embed/${item.video.id}?rel=0`}
                            className="bg-black"
                        />
                    </div>
                </div>
            </div>
        </div>}
        </>
    );
});

export default RankListItem;