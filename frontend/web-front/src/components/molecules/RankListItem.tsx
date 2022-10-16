import React, {FC, memo} from "react";
import { ButtonBase } from "@material-ui/core";
import { RankVideoData } from "../../client";

type Props = {
    item: RankVideoData;
    handleOpenModal: (item: RankVideoData) => void;
}

const RankListItem: FC<Props> = memo(function rankListItem(props: Props) {
    const {item, handleOpenModal} = props;

    return (
        <div>
            <ButtonBase
                focusRipple
                className="rank_item w-[480px] h-[268px]"
                onClick={() => handleOpenModal(item)}
            >
                <img className="absolute object-cover w-full h-full"
                    src={item.video.thumbnail_url}
                />
                <div className="backdrop absolute w-full h-full opacity-75 transition-all duration-500 bg-black"/>
                <div className="relative text-white w-full h-full p-8 flex justify-center items-center">
                    <span className="absolute text-[10rem] opacity-20 font-bold"
                        style={{fontFamily: "serif"}}
                    >
                        {item.rank}
                    </span>
                    <h1 className=" text-xl">
                        {item.video.title}
                    </h1>
                </div>
            </ButtonBase>
        </div>
    );
});

export default RankListItem;