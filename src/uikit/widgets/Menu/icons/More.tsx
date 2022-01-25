import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
    return (
        <Svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x={0}
            y={0}
            viewBox="0 0 500 500"
            xmlSpace="preserve"
            {...props}
        >
            <style>{".st0{fill:#fff}"}</style>
            <path
                className="st0"
                d="M128.3 296.6 86 248.2l45.6-42.8 33.4 42.8-36.7 48.4zM252.8 296.6l-42.3-48.4 45.6-42.8 33.4 42.8-36.7 48.4zM377.4 296.6l-42.3-48.4 45.6-42.8 33.4 42.8-36.7 48.4z"
            />
            <path
                style={{
                    fill: "none",
                }}
                d="M0 0h500v500H0z"
            />
        </Svg>
    );
};

export default Icon;
