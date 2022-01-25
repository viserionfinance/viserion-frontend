import React, {useState} from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import {useTranslation} from 'contexts/Localization'
import {CardFooter, ExpandableLabel, Flex, useTooltip} from 'uikit'
import {Pool} from 'state/types'
import ExpandedFooter from './ExpandedFooter'

interface FooterProps {
    pool: Pool
    account?: any
    userData: any
    totalCakeInVault?: BigNumber
}


const Footer: React.FC<any> = ({pool, userData, poolData}) => {
    const {isAutoVault} = pool
    const {t} = useTranslation()
    const [isExpanded, setIsExpanded] = useState(true)

    const manualTooltipText = t('You must harvest and compound your earnings from this pool manually.')
    const autoTooltipText = t(
        'Any funds you stake in this pool will be automagically harvested and restaked (compounded) for you.',
    )

    const {targetRef, tooltip, tooltipVisible} = useTooltip(isAutoVault ? autoTooltipText : manualTooltipText, {
        placement: 'bottom',
    })

    return (
        <CardFooter>
            {isExpanded && <ExpandedFooter pool={pool} userData={userData} poolData={poolData}/>}
        </CardFooter>
    )
}

export default Footer
