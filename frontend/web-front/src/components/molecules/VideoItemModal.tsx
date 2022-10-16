import React, {FC, memo} from "react";
import { Dialog } from "@material-ui/core";
import { RankVideoData } from "../../client";

type Props = {
    isOpened: boolean;
    item: RankVideoData;
    handleClose: (item: RankVideoData) => void;
}

const RankListItem: FC<Props> = memo(function rankListItem(props: Props) {
    const {isOpened, item, handleClose} = props;

    return (
        <Dialog open={isOpened} onClose={handleClose}>
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
        </Dialog>
    );
});

export default RankListItem;