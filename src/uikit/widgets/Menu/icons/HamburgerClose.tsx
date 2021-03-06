import React from "react";
import Svg from "../../../components/Svg/Svg";
import {SvgProps} from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 500 500"
            xmlSpace="preserve"
            {...props}
        >
            <defs>
                <path id="a" transform="rotate(-90 250 250)" d="M0 0h500v500H0z"/>
            </defs>
            <clipPath id="b">
                <use
                    xlinkHref="#a"
                    style={{
                        overflow: "visible",
                    }}
                />
            </clipPath>
            <g
                style={{
                    clipPath: "url(#b)",
                }}
            >
                <path
                    d="M123 456.6c-105.2-64.5-146.8-199-91.1-312.7C89.3 26.5 226.5-24.3 346.1 27.4c117.1 50.6 176.3 183 131.7 305.2-44.4 121.9-164.6 171.7-258.3 157.6.9-10.1 1.2-20.3 2.7-30.3 5.1-33 14.1-65 29.5-94.8 4.6-8.9 10.7-17 16.4-25.3 1.6-2.3 4.2-4 6.6-5.7 6.4-4.5 9-4.6 15 .2 15.2 12.2 30.6 24.2 45.2 37.2 16.2 14.4 43 15.3 59.3 1 1.5-1.3 3.7-2.3 5.7-2.6 16.1-2.1 31.2-6.2 42.9-18.5 7.4-7.7 11.4-17.1 12.5-27.5 1.5-14.4-1.2-28.4-6.2-41.3-3.8 7.1-7.2 14.7-11.7 21.6-7.2 10.8-17.7 17.4-30 21.1-1.9.6-3.9 1.3-5.6-1.5-10.2-16.8-26.4-23.1-46.6-19.5-15.7 2.8-31.2 2.6-46-5.2-10.5-5.5-15.7-14.5-18.3-25.3-9-37-4.7-72.5 12.5-106.4 2.9-5.7 7.2-11 8.8-17.1 3.5-12.7 1.9-25.1-6.2-36-1.8-2.4-2-4.2-1-6.9 8.8-23.4 22.2-42.6 46.8-52-37.5-13.2-75.1-6.7-92.8 37.5-2.3 5.8-4.8 10.2-10.7 13.8-17.7 10.9-22.5 35.3-11.3 53.5 7.7 12.5 12.9 25.9 16.3 40.1 1.9 8-.1 15.8-4.4 22.6-5.6 8.7-20.4 8.4-26.3-.3-9.7-14.4-15.1-30.6-17.2-47.7-1.2-9.5-.8-19.2-2.1-28.6-2.6-19-17.2-31.7-36.4-32.5-1 0-2-.1-3.4-.3-5.3-22.8 2-42.8 13.3-62.9-22.4 5.5-43 12.7-53.7 34.4-7.5 15.1-5 30.6.6 45.8.9 2.3 1.1 5.4.4 7.7-5.5 16.7-1.8 36.8 14.6 47.9 22.3 15.1 41.3 33.9 58.5 54.5 5.7 6.8 3.7 13.6-4.9 15.5-2.4.5-5.1.3-7.5-.4-19.6-5.9-37.8-14.7-53.7-27.8-4.6-3.8-8.8-8.2-13.7-11.4-8.7-5.6-18.8-5.7-28.8-5.1-1.4.1-3.5-.4-4.4-1.4-13.7-16.3-22.3-34.2-16.9-57.4-18.1 16.4-34.2 32.8-31.8 59 1.1 12.2 7 22.3 14.8 31.4 2.4 2.8 3.7 5.6 3.9 9.5 1.6 29.5 26.7 40.1 48 37.7 15.3-1.7 30.7-4.1 45.9-3.4 13.3.6 24.1 9.1 31.7 20.4 9.9 14.7 8.9 30.8 3.2 46.3-4.5 12.1-10.5 23.7-17.1 34.7-12.9 21.7-26.8 42.9-40.2 64.3-.7 1.1-1.7 2.3-2.7 3.8z"
                    style={{
                        fill: "#fff",
                    }}
                />
            </g>
        </Svg>
    );
};

export default Icon;
