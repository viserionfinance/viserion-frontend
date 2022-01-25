import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Card, CardBody, Heading, Skeleton} from 'uikit'
import {useTranslation} from 'contexts/Localization'
import {useFarms} from "../../../state/farms/hooks";
import BigNumber from "bignumber.js";

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  padding: 10px;
  background-image: url('/images/card-bg-bot.svg');
  background-size: 23%;
  background-repeat: no-repeat;
  background-position: bottom right;
  background-origin: content-box;
`

const TotalValueLockedCard = () => {
    const {t} = useTranslation()
    const farms = useFarms()
    const [tvl, setTvl] = useState(0);

    useEffect(() => {
        if (farms.data.length > 0) {
            let total = 0
            farms.data.map(farm => {
                total += new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice).toNumber()
            })
            setTvl(total)
        }
    }, [farms]);

    return (
        <StyledTotalValueLockedCard>
            <CardBody>
                <Heading scale="lg" mb="24px">
                    {t('Total Value Locked (TVL)')}
                </Heading>
                {tvl ? (
                    <>
                        <Heading scale="xl">{`$${tvl.toLocaleString("EN")}`}</Heading>
                    </>
                ) : (
                    <Skeleton height={66}/>
                )}
            </CardBody>
        </StyledTotalValueLockedCard>
    )
}

export default TotalValueLockedCard
