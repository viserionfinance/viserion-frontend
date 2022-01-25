import React from 'react'
import {Text} from 'uikit'
import CountdownComponent from "../countdown/Countdown";
import CardValue from "../../Home/components/CardValue";
import CountdownStart from "../countdown/CowntdownStart";
import {useTranslation} from "../../../contexts/Localization";

export default function IdoInfo({idoData}) {
    const {t} = useTranslation()
    return (
        <>
            <table className="saving-table" style={{marginTop: '20px'}}>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('IDO Amount')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            <CardValue value={10000000} decimals={0} fontSize="15px" lineHeight="36px"/> VeFI
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('Liquidity Providing')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            <CardValue value={9000000} decimals={0} fontSize="15px" lineHeight="36px"/> VeFI
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('Softcap')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            500 Metis
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('Hard Cap')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            750 Metis
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('Presale price')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            1 Metis = 13,333 VeFI (~ $0,011)
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('Total deposited')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            {idoData && idoData.raisedTotal ? idoData.raisedTotal : "0"} Metis
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('Maximum Contribution')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            {idoData.maxIndividualCap ? idoData.maxIndividualCap : "3"} Metis
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('Vesting Schedule')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            20% Daily From 25th - 29th Jan
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('NetSwap Listing Price')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            1 Metis = 12,000 VeFi (~ $0,0125)
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('Presale Start Time')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            <CountdownStart dataIdo={idoData} epochTime={1643032800000}/>
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('Presale End Time')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            {
                                idoData.endTime ?
                                    <CountdownComponent epochTime={idoData.endTime}/>
                                    : "25th Jan, 2 PM UTC"
                            }

                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('Listing Time')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            {t('Right After Presale')}
                        </Text>
                    </td>
                </tr>
            </table>

        </>
    )
}
