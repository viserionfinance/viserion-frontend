import {useWeb3React} from '@web3-react/core'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import {useTranslation} from 'contexts/Localization'
import React from 'react'
import {useLocation} from 'react-router-dom'
import styled from 'styled-components'
import {Heading} from 'uikit'

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`

const Referral: React.FC = () => {
    const location = useLocation()
    const {t} = useTranslation()
    const {account} = useWeb3React()
    return (
        <>
            <PageHeader>
                <Heading as="h1" scale="xxl" color="secondary" mb="24px">
                    {t('VeFI Referral Program')}
                </Heading>
                <Heading scale="md" color="text">
                    {t(`Whenever someone signs up with your referral link, you'll earn 1% of their earnings from Farms and Pools--no strings attached!`)}
                </Heading>
            </PageHeader>
            <Page>
                <CardLayout>
                    {' '}
                </CardLayout>
            </Page>
        </>
    )
}

export default Referral
