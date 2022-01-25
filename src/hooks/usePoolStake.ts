import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {useCake, useIdoContact, usePoolContract, useTokenContract} from "./useContract";
import {useCallback} from "react";
import multicall from "../utils/multicall";
import poolAbi from "config/abi/pool.json"
import {getAddress} from "../utils/addressHelpers";
import addresses from 'config/constants/contracts'
import {getBalanceNumber} from "../utils/formatBalance";
import tokens from "../config/constants/tokens";
import BigNumber from "bignumber.js";
import {BIG_TEN} from "../utils/bigNumber";
import {userInfo} from "os";

export function usePoolStake() {
    const {library} = useActiveWeb3React()
    const poolContract = usePoolContract()
    const token = useCake()

    const getData = useCallback(
        () => {
            return multicall(
                poolAbi,
                [
                    {
                        name: "remainingRewards",
                        address: getAddress(addresses.pool)
                    },
                    {
                        name: "rewardsPerBlock",
                        address: getAddress(addresses.pool)
                    },
                    {
                        name: "totalAllocPoint",
                        address: getAddress(addresses.pool)
                    },
                    {
                        name: "poolInfo",
                        address: getAddress(addresses.pool),
                        params: ["0"]
                    }
                ]
            ).then(([remainingRewards, rewardsPerBlock, totalAllocPoint, poolInfo])=> {
                return{
                    remainingRewards: +remainingRewards/1e18,
                    rewardsPerBlock: +rewardsPerBlock,
                    totalAllocPoint: +totalAllocPoint,
                    poolInfo: {
                        accRewardPerShare: +poolInfo.accRewardPerShare,
                        allocPoint: +poolInfo.allocPoint,
                        currentDepositAmount: +poolInfo.currentDepositAmount,
                        lastRewardBlock: +poolInfo.lastRewardBlock,
                    }
                }
            })
        },
        [poolContract],
    );

    const getUserData = useCallback(
        async (account) => {
            return multicall(poolAbi,
                [
                    {
                        name: "userInfo",
                        address: getAddress(addresses.pool),
                        params: [account]
                    },
                    {
                        name: "pendingRewards",
                        address: getAddress(addresses.pool),
                        params: [account]
                    },
                ]
            ).then(([userInfo, pendingRewards])=> {
                return {
                    amount: +userInfo.amount/1e18,
                    pendingRewards: +pendingRewards/1e18
                }
            })
            return poolContract.userInfo(account)
                .then(res=> {
                    return {
                        amount: +res.amount/1e18,
                        rewardDebt: +res.rewardDebt/1e18
                    }
                })
        },
        [poolContract, library],
    );

    const deposit = useCallback(
        (amount) => {
            const value = new BigNumber(amount).times(BIG_TEN.pow(18)).toString()
            return poolContract.deposit(value)
        },
        [poolContract],
    );

    const withdraw = useCallback(
        (amount) => {
            const value = new BigNumber(amount).times(BIG_TEN.pow(18)).toString()
            return poolContract.withdraw(value)
        },
        [poolContract],
    );

    const emergencyWithdraw = useCallback(
        () => {
            return poolContract.emergencyWithdraw()
        },
        [poolContract],
    );

    const harvestFor = useCallback(
        (account) => {
            return poolContract.harvestFor(account)
        },
        [poolContract],
    );

    const allowance = useCallback(
        async (account) => {
            return token.allowance(account, getAddress(addresses.pool))
                .then((approveResult: any) => {
                    return approveResult.gt(1000000000000)
                });
        },
        [library, token],
    );

    const approve = useCallback(
        async () => {
            return token.approve(getAddress(addresses.pool), "1000000000000000000000000000000")
        },
        [library, token],
    );

    return {
        poolContract: poolContract,
        getData: getData,
        getUserData: getUserData,
        allowance: allowance,
        approve: approve,
        deposit: deposit,
        withdraw: withdraw,
        harvestFor: harvestFor,
        emergencyWithdraw: emergencyWithdraw
    }
}

