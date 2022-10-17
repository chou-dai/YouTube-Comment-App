import React, {FC, memo, ReactNode} from "react";
import { IconButton, Tooltip } from "@material-ui/core";

type Props = {
    icon: ReactNode;
    text: string;
    handleClick: () => void;
}

const BaseIconButton: FC<Props> = memo(function baseIconButton(props: Props) {
    const {icon, text, handleClick} = props;

    return (
        <Tooltip title={text} placement="top">
            <IconButton onClick={handleClick}>
                {icon}
            </IconButton>
        </Tooltip>
    );
});

export default BaseIconButton;