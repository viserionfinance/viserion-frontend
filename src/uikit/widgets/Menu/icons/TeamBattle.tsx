import React from 'react'
import Svg from '../../../components/Svg/Svg'
import {SvgProps} from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
    return (
        <Svg
            id="prefix__Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x={0}
            y={0}
            viewBox="0 0 23.3 23.3"
            xmlSpace="preserve"
            {...props}
        >
            <style>
                {
                    ".prefix__st0,.prefix__st1{fill:#fff;stroke:#000;stroke-width:.75;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}.prefix__st1{fill:none}"
                }
            </style>
            <path
                className="prefix__st0"
                d="M1.4 20.8V10.3c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v10.5M19.8 20.8V10.3c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1v10.5"
            />
            <circle className="prefix__st0" cx={11.7} cy={12.8} r={5.9}/>
            <circle className="prefix__st0" cx={11.7} cy={12.7} r={3.8}/>
            <path
                className="prefix__st1"
                d="M2.5 9.2V7S5 7.1 5 4.4M20.9 9.2V7s-2.5.1-2.5-2.6"
            />
            <path
                className="prefix__st0"
                d="M1.8 4.4l1.7-4h16.3l1.8 4M4.8 2.6h2.3M10.5 2.6h2.3M8.4 2.6h.8M14.2 2.6h.8M16.4 2.6h2.3M9.3 4.4v3M14.1 4.4v3M13.7 12.7s0 .7-.6 1.2M11.7 14.6h.1"
            />
            <path
                className="prefix__st1"
                d="M.5 3.2S.4 4.4 1.9 4.4h19.7s1.3.2 1.3-1.3"
            />
            <path
                className="prefix__st0"
                d="M22.4 22.9H.9c-.2 0-.4-.2-.4-.4v-1.2c0-.2.2-.4.4-.4h21.5c.2 0 .4.2.4.4v1.2c.1.2-.1.4-.4.4z"
            />
        </Svg>
    )
}

export default Icon
