import React, {useEffect, useRef} from 'react'
import {useCountUp} from 'react-countup'
import {Text} from 'uikit'

export interface CardValueProps {
    value: number
    decimals?: number
    fontSize?: string
    lineHeight?: string
    prefix?: string
    bold?: boolean
    color?: string
}

const CardValue: React.FC<CardValueProps> = ({value, decimals, fontSize = '40px', prefix, color}) => {
    const {countUp, update} = useCountUp({
        start: 0,
        end: value,
        duration: 1,
        separator: ',',
        decimals: decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
    })

    const updateValue = useRef(update)

    useEffect(() => {
        updateValue.current(value)
    }, [value, updateValue])

    return (
        <Text bold fontSize={fontSize} color="primary" className="font-alt">
            {prefix}
            {countUp}
        </Text>
    )
}

export default CardValue
