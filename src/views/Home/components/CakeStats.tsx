import React from 'react'
import {Card, CardBody, Heading, Text} from 'uikit'
import styled from 'styled-components'
import {getBalanceNumber} from 'utils/formatBalance'
import {useBurnedBalance, useTotalSupply} from 'hooks/useTokenBalance'
import {useTranslation} from 'contexts/Localization'
import {getCakeAddress} from 'utils/addressHelpers'
import CardValue from "./CardValue";

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
    const {t} = useTranslation()
    const totalSupply = useTotalSupply()
    const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
    const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
    const burned = 0
    return (
        <StyledCakeStats>
            <CardBody>
                <Heading scale="xl" mb="24px">
                    {t('VeFI Stats')}
                </Heading>
                <Row>
                    <Text fontSize="14px">{t('Total Supply')}</Text>
                    N/a
                    {/* <CardValue fontSize="14px" value={cakeSupply}/> */}
                </Row>
                <Row>
                    <Text fontSize="14px">{t('Total Minted')}</Text>
                    {/* <CardValue fontSize="14px" value={cakeSupply > 0 ? cakeSupply + burned - 8e6 : 0}/> */}
                    N/a
                </Row>
                <Row>
                    <Text fontSize="14px">{t('Total Burned')}</Text>
                    N/a
                    {/*<CardValue fontSize="14px" value={burned}/>*/}
                </Row>
                <Row>
                    <Text fontSize="14px">{t('New VeFI/block')}</Text>
                    N/a
                </Row>
            </CardBody>
        </StyledCakeStats>
    )
}

export default CakeStats
