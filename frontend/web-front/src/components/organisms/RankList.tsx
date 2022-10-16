import React, {FC, memo} from "react";
import { RankVideoData } from "../../client";
import { RankListItem } from "../molecules";

type Props = {
    items: Array<RankVideoData>;
    handleOpenModal: (item: RankVideoData) => void;
}

const RankList: FC<Props> = memo(function rankList(props: Props) {
    const {items, handleOpenModal} = props;

    return (
        <div className="flex flex-wrap w-full">
            {items.map((item) => (
                <RankListItem
                    key={item.video.id}
                    item={item}
                    handleOpenModal={handleOpenModal}
                />
            ))}
        </div>
    );
});

export default RankList;