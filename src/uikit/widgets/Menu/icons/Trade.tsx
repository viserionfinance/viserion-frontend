import React from 'react'
import Svg from '../../../components/Svg/Svg'
import {SvgProps} from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
    return (
        <Svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23.222 23.189"
            {...props}
        >
            <path
                d="M11.611 11.577a5.618 5.618 0 01-11.236 0 11.236 11.236 0 0022.472 0 5.618 5.618 0 10-11.236 0z"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.75}
                fill="#fff"
            />
            <path
                d="M11.611 11.611a5.618 5.618 0 1111.236 0 11.236 11.236 0 00-22.472 0 5.618 5.618 0 0011.236 0z"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.75}
            />
            <circle cx={5.822} cy={11.578} r={1.776} fill="#fff"/>
            <circle cx={17.267} cy={11.578} r={1.776}/>
        </Svg>
    )
}

export default Icon
