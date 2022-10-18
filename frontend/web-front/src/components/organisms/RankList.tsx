import React, {FC, memo} from "react";
import { RankVideoData } from "../../client";
import { convertDateToDisplayString } from "../../utils/timeUtil";
import { RankListItem } from "../molecules";

type Props = {
    items: Array<RankVideoData>;
    handleOpenModal: (item: RankVideoData) => void;
}

const RankList: FC<Props> = memo(function rankList(props: Props) {
    const {items, handleOpenModal} = props;

    return (
        <div className="w-11/12 max-w-[1920px]">
            <span>
                {convertDateToDisplayString(new Date(items[0].created_at), "yyyy/MM/dd HH:mm:ss 更新")}
            </span>
            <div className="flex flex-wrap">
                {items.map((item) => (
                    <RankListItem
                        key={item.video.id}
                        item={item}
                        handleOpenModal={handleOpenModal}
                    />
                ))}
            </div>
        </div>
    );
});

export default RankList;