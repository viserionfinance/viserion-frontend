import React, {useEffect, useState} from 'react'
import {useWeb3React} from '@web3-react/core'
import {Heading, Text} from 'uikit'
import styled, {keyframes} from 'styled-components'
import Page from 'components/Layout/Page'
import {useTranslation} from 'contexts/Localization'
import PageHeader from 'components/PageHeader'
import UserInfo from "./components/UserInfo";
import IdoInfo from "./components/IdoInfo";
import Deposit from "./components/Deposit";
import {useIdo} from "../../hooks/useIdo";

const Ido: React.FC = () => {
    const {t} = useTranslation()
    const {account} = useWeb3React()
    const idoAction = useIdo()

    const [idoData, setIdoData] = useState<any>({});
    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        let interval = setInterval(() => {
            idoAction.getIdoData()
                .then(setIdoData)
        }, 3000)
        return () => {
            clearInterval(interval)
        }
    }, []);

    useEffect(() => {
        if (account) {
            idoAction.getUserData(account)
                .then(setUserData)
        }
    }, [account, idoData]);

    return (
        <>
            <PageHeader>
                <Heading as="h1" scale="xxl" color="secondary" mb="24px">
                    {t('VeFI Ido')}
                </Heading>
                <Heading scale="md" color="text">
                    {t('A decentralized hybrid yield earning with value-optimized, economically sustainable running on the Metis Andromeda blockchain.')}
                </Heading>
            </PageHeader>
            <Page>
                <div>
                    <StyledSavingSmall>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Text
                                bold
                                style={{fontSize: "28px", fontWeight: "bold"}}
                            >
                                {t('Your information')}
                            </Text>
                        </div>
                        <UserInfo userData={userData}/>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Text
                                bold
                                style={{fontSize: "28px", fontWeight: "bold", marginTop: "20px"}}
                            >
                                {t('IDO information')}
                            </Text>
                        </div>
                        <IdoInfo idoData={idoData}/>
                    </StyledSavingSmall>
                    <StyledSavingCard>
                        <FCard isPromotedFarm={true}>
                            <Deposit idoData={idoData} userData={userData}/>
                        </FCard>
                    </StyledSavingCard>
                </div>
            </Page>
        </>
    )
}

const StyledSavingCard = styled.div`
  background-color: transparent;
  background-size: 100% 100%;
  box-shadow: none;
  border-radius: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 450px;
  position: relative;
  z-index: 1;

  .saving-radio{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;

    .radio-item{
      width: 120px;
      margin: 0 10px;
      align-items: center;
    }
    
    .saving-radio-el{
    margin: 5px;
    &:checked {
        background-color: transparent;
        border: 1px solid #faaf00;
        &:after {
            background-color: #faaf00;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        }
    }
  }
`

const StyledSavingSmall = styled.div`
  //background-color: ;
  background-size: 32%;
  background-repeat: no-repeat;
  background-position: top right;
  box-shadow: none;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 550px;
  padding: 50px 30px 70px;
  margin-bottom: 70px;
  box-shadow: -1px 1px 3px #0000003d;
  border-radius: 17px;
  
  .saving-table{
    width: 100%;
    td{
      width: 50%;
    }
    td:first-child{
      text-align: right;
      padding-right: 20px;
    }
    td:last-child{
      text-align: left;
      padding-left: 20px;
    }
  }
`

const FCard = styled.div<{ isPromotedFarm: boolean }>`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: ${({theme, isPromotedFarm}) => (isPromotedFarm ? '31px' : theme.radii.card)};
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const AccentGradient = keyframes`  
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

const StyledCardAccent = styled.div`
  background: ${({theme}) => `linear-gradient(180deg, #c9262c, #f1b361)`};
  background-size: 400% 400%;
  animation: ${AccentGradient} 2s linear infinite;
  border-radius: 32px;
  position: absolute;
  top: -5px;
  right: -5px;
  bottom: -5px;
  left: -5px;
  z-index: -1;
`


export default Ido
