import React from "react";
import styled from "styled-components";
import {space, variant as systemVariant} from "styled-system";
import {ErrorIcon, WarningIcon} from "../Svg";
import {Box} from "../Box";
import {MessageProps} from "./types";
import variants from "./theme";

const Icons = {
    warning: WarningIcon,
    danger: ErrorIcon,
};

const MessageContainer = styled.div<MessageProps>`
  display: flex;
  background-color: gray;
  padding: 16px;
  border-radius: 16px;
  border: solid 1px;

  ${space}
  ${systemVariant({
    variants,
})}
`;

const Message: React.FC<MessageProps> = ({children, variant, ...props}) => {
    const Icon = Icons[variant];
    return (
        <MessageContainer variant={variant} {...props}>
            <Box>
                <Icon color={variants[variant].borderColor} width="24px" mr="12px"/>
            </Box>
            {children}
        </MessageContainer>
    );
};

export default Message;
