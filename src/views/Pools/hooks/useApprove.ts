import {useCallback, useState} from 'react'
import {useWeb3React} from '@web3-react/core'
import {Contract, ethers} from 'ethers'
import {useAppDispatch} from 'state'
import {updateUserAllowance} from 'state/actions'
import {useTranslation} from 'contexts/Localization'
import {useSousChef} from 'hooks/useContract'
import useToast from 'hooks/useToast'

export const useApprovePool = (lpContract: Contract, sousId, earningTokenSymbol) => {
    const [requestedApproval, setRequestedApproval] = useState(false)
    const {toastSuccess, toastError} = useToast()
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const {account} = useWeb3React()
    const sousChefContract = useSousChef(sousId)

    const handleApprove = useCallback(async () => {
        try {
            setRequestedApproval(true)
            const tx = await lpContract.approve(sousChefContract.address, ethers.constants.MaxUint256)
            const receipt = await tx.wait()

            dispatch(updateUserAllowance(sousId, account))
            if (receipt.status) {
                toastSuccess(
                    t('Contract Enabled'),
                    t('You can now stake in the %symbol% pool!', {symbol: earningTokenSymbol}),
                )
                setRequestedApproval(false)
            } else {
                // user rejected tx or didn't go thru
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
                setRequestedApproval(false)
            }
        } catch (e) {
            console.error(e)
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        }
    }, [account, dispatch, lpContract, sousChefContract, sousId, earningTokenSymbol, t, toastError, toastSuccess])

    return {handleApprove, requestedApproval}
}
