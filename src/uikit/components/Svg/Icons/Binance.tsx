import React from "react";
import Svg from "../Svg";
import {SvgProps} from "../types";

const Icon: React.FC<SvgProps> = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 490 470"
            // style={{
            //     enableBackground: "new 0 0 490 470",
            // }}
            xmlSpace="preserve"
            {...props}
        >
            <style>
                {
                    ".st0{fill:#00d8c1}.st1{fill:#002033}.st2{fill:#7f7f7f}.st4{fill:#fff}.st5{fill:#fafafa}.st6{fill:#221f20}"
                }
            </style>
            <path
                d="M245 16.9c-122.5 0-221.7 99.3-221.7 221.7 0 88.3 51.6 164.5 126.2 200.2 2.8-4.5 5.4-8.2 7.7-10.7 13.3-14.4 24.6-46.6 28.1-57.5.2-.1.3-.3.3-.5l.6-2.4c.2-.5.3-.8.3-.8 2.6-10.4 5.4-20.6 8.7-30.6 3.5 4 18.7.7 21.7.1 9.9-2 25.6-7.5 31.8-16.1 5.8-8.1-2.9-9.1-9.4-8-14.3 2.6-28.3 10.8-41.2 17.7 0-.4-.1-.8-.4-1.2 3.7-10.5 7.8-20.8 12.5-30.9 20.4 2.6 42.9.8 58.4-14.2 1.5-1.4-.3-3.8-2-3.6-17.7 2.1-36.2 5.1-53.1 11.2 3.4-6.8 7.1-13.5 11.2-20.1 2.6-4.3 5.4-8.5 8.2-12.6 22.9 2.5 46-4.5 64.2-18.6 1.8-1.4.5-3.8-1.5-3.8-19.4-.2-38.6 3.8-55.7 12.8 8.1-10.7 16.9-20.7 26.3-30.3 21 4.2 44-1.7 61.7-13.3 2.2-1.4.5-4.3-1.7-4.3-17-.1-34.8 2.4-50.9 8.6 5.7-5.4 31.4-19.7 37.3-23.1 11.9-6.8 23.3-14.2 33.3-23.7 1.7-1.7.6-4.2-2.2-3.9-29.6 3.1-66.3 41.2-71.9 46.2 12.3-15.9 22.7-33.8 25.8-53.8.3-2.2-2.3-3-3.7-1.6-17.2 17.3-31.7 40.7-34.7 65.3-.1.6.2 1.1.6 1.5-8.1 8.3-15.8 17.2-22.9 26.7 7-18.1 9.2-37.6 6.6-57.1-.2-1.5-2.1-2.6-3.4-1.5-8.8 7.4-10.7 17.6-11.7 28.6-1.2 12.9-1.1 25.8.1 38.7.1.7.4 1.2.8 1.6l-.3.6c-.2.4-.5.7-.7 1.1-.4.2-.7.7-.8 1.1-5.4 8-10.4 16.4-14.9 24.9 1-10.1.6-20.4-.9-30.4-.6-3.9-1.8-23.5-9-22.5-7.6 1.1-4.9 19-4.7 23.5.5 14.6 2.6 29 6.3 43.1.2.6.5 1 .9 1.3-4.1 8.9-7.7 17.9-10.7 27.1-1.1-9.4-5.9-19.4-10-26.9-2.2-4.2-8.5-18.7-15.3-16.9-7.6 2.1.3 18.2 2 22 4.5 10.7 11.5 22 21 29-3.6 11.9-6.3 23.9-8 35.9-4.7-1-16.5-4.4-28.9-14.3-15-2.6-22.9-10.7-28.8-27.8-2-5.7-4.5-11.3-7.2-16.7-.8-1.6-7.2-.6-6.8-4.7-.6 5.3-3.9.4-7-6.6-2.2-5-3.5-9.6-3.8-14-.5-6-3-9.7-8.7-12.1-11.4-4.8-16.3-14-17.5-25.5l-.9-7.5c-.8.1-1.5.1-2.3.2 0 6.4-5.4-3.2 1.7-13.9 1.7-2.6 2.6-5.8 3.9-8.7-.7-.5-1.4-1.1-2.1-1.6-3.6 1.7-3.4-1.4.9-4.4-5.6-19.2 6.9-30.9 21.2-42.3-2.8-1.1-4.4-1.8-7.3-2.9 4.2-1 6.9-1.8 9.7-2.4.7-.1 1.4-.1 2.2-.1.5-3 2.1-6.5 5.7-10.7 2.8-3.4 6.4-4.2 10.5-3.9.7-4.3 2-8.4 8-8.5 10.4-.2 15.8-6.8 21.9-13.4 5.4-5.9 11.4-11.3 17.4-16.6 3.1-2.7 7.5-3.9 10.3-6.7C190.4 87.4 209 82 227.5 79c12.4-2.1 26.1 1.8 39 4.2 1.9.4 3.7.9 5.4 1.4 29 1.6 66.1 6.5 76.1 20.9 17.2 24.7 14.7 29.3 14.7 29.3l22.3 38s-8.3 19.6-4.9 26.6c3.4 7 17.4 20.6 17.4 20.6s20.6 15.1 20.6 15.9c0 .9.9 4.5-4.3 8.7-5.1 4.3-14.7 9.4-14.7 9.4s.4 3.2 1.7 5.7c1.3 2.6 4.5 6.4 3.4 9.8-1.1 3.4-8.1 6-6.2 9.8 1.9 3.8 6.8 5.1 5.3 8.5-1.5 3.4-8.5 9.1-7.9 11.7.6 2.6 5.7 26.1-7.2 30-13 3.8-55.7 4.7-55.7 4.7s-8.7 6-11.5 22.5c-2.8 16.6-20 54.4-20 54.4s-12.3 23.6-10.4 28.9c1.9 5.3 5.5 8.1 9.8 11.9.4.4.8.7 1.3 1.1 94.9-25.1 164.9-111.6 164.9-214.4.1-122.4-99.1-221.7-221.6-221.7z"
                style={{
                    fill: "#00dacc",
                }}
                id="Logo"
            />
        </Svg>
    );
};

export default Icon;