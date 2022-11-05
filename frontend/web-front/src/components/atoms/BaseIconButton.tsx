import React, {FC, memo, ReactNode} from "react";
import { IconButton, Tooltip } from "@material-ui/core";

type Props = {
    icon: ReactNode;
    text: string;
    className?: string;
    handleClick: () => void;
}

const BaseIconButton: FC<Props> = memo(function baseIconButton(props: Props) {
    const {icon, text, className, handleClick} = props;

    return (
        <Tooltip title={text} placement="top" className={className}>
            <IconButton onClick={handleClick}>
                {icon}
            </IconButton>
        </Tooltip>
    );
});

export default BaseIconButton;