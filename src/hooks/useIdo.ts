import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {useIdoContact, useTokenContract} from "./useContract";
import {useCallback} from "react";
import multicall from "../utils/multicall";
import IdoAbi from "config/abi/ido.json"
import {getAddress} from "../utils/addressHelpers";
import addresses from 'config/constants/contracts'
import {getBalanceNumber} from "../utils/formatBalance";
import tokens from "../config/constants/tokens";
import BigNumber from "bignumber.js";
import {BIG_TEN} from "../utils/bigNumber";
import {ethers} from "ethers";

export function useIdo() {
    const {chainId, library} = useActiveWeb3React()
    const idoContract = useIdoContact()
    const usdtContract = useTokenContract(getAddress(tokens.usdt.address))
    const getIdoData = useCallback(
        async () => {
            return multicall(IdoAbi, [
                {
                    name: "ended",
                    address: getAddress(addresses.ido)
                },
                {
                    name: "startTime",
                    address: getAddress(addresses.ido)
                },
                {
                    name: "endTime",
                    address: getAddress(addresses.ido)
                },
                {
                    name: "withdrawable",
                    address: getAddress(addresses.ido)
                },
                {
                    name: "raisedTotal",
                    address: getAddress(addresses.ido)
                },
                {
                    name: "isRefund",
                    address: getAddress(addresses.ido)
                },
                {
                    name: "isDepositedTokenCap",
                    address: getAddress(addresses.ido)
                },
                {
                    name: "maxIndividualCap",
                    address: getAddress(addresses.ido)
                },
                {
                    name: "minIndividualCap",
                    address: getAddress(addresses.ido)
                },
                {
                    name: "durationTime",
                    address: getAddress(addresses.ido)
                },
                {
                    name: "maxMetisCap",
                    address: getAddress(addresses.ido)
                },
                {
                    name: "waitTime",
                    address: getAddress(addresses.ido)
                },
            ]).then((
                [
                    ended,
                    startTime,
                    endTime,
                    withdrawable,
                    raisedTotal,
                    isRefund,
                    isDepositedTokenCap,
                    maxIndividualCap,
                    minIndividualCap,
                    durationTime,
                    maxMetisCap,
                    waitTime
                ]
            ) => {
                const percentRaised = getBalanceNumber(raisedTotal, 18) / (getBalanceNumber(maxMetisCap, 18) / 100)
                return {
                    ended: ended[0],
                    startTime: startTime[0].toNumber() * 1000,
                    endTime: endTime[0].toNumber() * 1000,
                    withdrawable: withdrawable[0],
                    raisedTotal: getBalanceNumber(raisedTotal, 18),
                    isRefund: isRefund[0],
                    isDepositedTokenCap: isDepositedTokenCap[0],
                    maxIndividualCap: getBalanceNumber(maxIndividualCap, 18),
                    minIndividualCap: getBalanceNumber(minIndividualCap, 18),
                    durationTime: durationTime[0].toNumber(),
                    maxMetisCap: getBalanceNumber(maxMetisCap, 18),
                    percentRaised,
                    waitTime
                }
            })
        },
        [library],
    );

    const getUserData = useCallback(
        async (account) => {
            return idoContract.userInfo(account)
        },
        [library],
    );

    const ido = useCallback(
        async (amount) => {
            const value = new BigNumber(amount).times(BIG_TEN.pow(18)).toString()
            return idoContract.ido(value, {value})
        }, [library],
    );

    const withdraw = useCallback(
        async () => {
            return idoContract.claimToken().then(({wait}) => wait().then(res => res))
        }, [library],
    );

    const allowance = useCallback(
        async (account) => {
            return usdtContract.allowance(account, getAddress(addresses.ido))
                .then((approveResult: any) => {
                    return approveResult.gt(ethers.BigNumber.from(10).pow(30))
                });
        },
        [library, usdtContract],
    );

    const approve = useCallback(
        async () => {
            return usdtContract.approve(getAddress(addresses.ido), ethers.BigNumber.from(10).pow(60))
        },
        [library, usdtContract],
    );

    return {
        idoContract: idoContract,
        getIdoData: getIdoData,
        getUserData: getUserData,
        ido: ido,
        allowance: allowance,
        approve: approve,
        withdraw: withdraw
    }
}

