import React from 'react'
import {Text} from 'uikit'
import useTokenBalance, {useGetBnbBalance} from "../../../hooks/useTokenBalance";
import {getCakeAddress} from "../../../utils/addressHelpers";
import {getBalanceNumber} from "../../../utils/formatBalance";
import ValueNumber from "./ValueNumber";
import {useTranslation} from "../../../contexts/Localization";


export default function UserInfo({userData}) {
    const {balance: metisBalance} = useGetBnbBalance()
    const {balance: tokenBalance} = useTokenBalance(getCakeAddress())
    const {t} = useTranslation()
    return (
        <>
            <table className="saving-table" style={{marginTop: '20px'}}>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('Metis Balance')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            <ValueNumber value={getBalanceNumber(metisBalance, 18)}/> Metis
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text
                            style={{fontSize: "14px"}}
                        >
                            {t('VeFI Balance')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            <ValueNumber value={getBalanceNumber(tokenBalance, 18)}/> VeFI
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Text style={{fontSize: "14px"}}>
                            {t('Deposited')}
                        </Text>
                    </td>
                    <td>
                        <Text
                            style={{fontSize: "15px"}}
                            bold
                            color="primary"
                            className="font-alt"
                        >
                            {userData.balances ? (+userData.balances / 1e18).toLocaleString("EN") : 0} Metis
                        </Text>
                    </td>
                </tr>
            </table>

        </>
    )
}
