import React from 'react'
import {Flex, TooltipText, useModal, useTooltip} from 'uikit'
import {useTranslation} from 'contexts/Localization'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import {Pool} from 'state/types'
import {getAprData} from 'views/Pools/helpers'
import {getAddress} from 'utils/addressHelpers'
import {useCakeBusdPrice} from "../../../../hooks/useBUSDPrice";

interface AprRowProps {
    pool: Pool
    performanceFee?: number
}

const AprRow: React.FC<any> = ({pool, performanceFee = 0, poolData}) => {
    const {t} = useTranslation()
    const {stakingToken, earningToken, isFinished, apr, earningTokenPrice, isAutoVault} = pool

    const totalToken = poolData.poolInfo ? poolData.poolInfo.currentDepositAmount : 0
    const priceCake = useCakeBusdPrice()


    // totalVeFI
    const tooltipContent = isAutoVault
        ? t('APY includes compounding, APR doesn’t. This pool’s VeFI is compounded automatically, so we show APY.')
        : t('This pool’s rewards aren’t compounded automatically, so we show APR')

    const {targetRef, tooltip, tooltipVisible} = useTooltip(tooltipContent, {placement: 'bottom-start'})

    const {apr: earningsPercentageToDisplay, roundingDecimals, compoundFrequency} = getAprData(pool, performanceFee)

    const apyModalLink = stakingToken.address ? `/swap?outputCurrency=${getAddress(stakingToken.address)}` : '/swap'

    const [onPresentApyModal] = useModal(
        <ApyCalculatorModal
            tokenPrice={earningTokenPrice}
            apr={apr}
            linkLabel={t('Get %symbol%', {symbol: stakingToken.symbol})}
            linkHref={apyModalLink}
            earningTokenSymbol={earningToken.symbol}
            roundingDecimals={roundingDecimals}
            compoundFrequency={compoundFrequency}
            performanceFee={performanceFee}
        />,
    )

    return (
        <Flex alignItems="center" justifyContent="space-between">
            {tooltipVisible && tooltip}
            <TooltipText ref={targetRef}>{isAutoVault ? `${t('APY')}:` : `${t('APR')}:`}</TooltipText>
            {priceCake > 0 && totalToken ? ((1680000 / ((totalToken / 1e18) * +priceCake)) * 100).toFixed(3) : "N/A"} %
        </Flex>
    )
}

export default AprRow
