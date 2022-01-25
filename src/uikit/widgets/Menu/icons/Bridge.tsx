import React from 'react'
import Svg from '../../../components/Svg/Svg'
import {SvgProps} from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
    return (
        <Svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23.222 9.366"
            {...props}
        >
            <path
                d="M.375 2.439v6.552H5.45s.707-5.883 6.06-5.883 6.161 5.883 6.161 5.883h5.176V2.224a6.4 6.4 0 01-2.067.262 9.618 9.618 0 01-3.45-.736A14.522 14.522 0 0011.611.375a12.736 12.736 0 00-5.414 1.258 14.663 14.663 0 01-4.436 1c-1.195 0-1.386-.194-1.386-.194z"
                fill="#fff"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.75}
            />
        </Svg>
    )
}

export default Icon
