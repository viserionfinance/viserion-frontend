import BigNumber from 'bignumber.js'
import {DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL} from 'config'

const options = {
    gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount) => {
    const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
    // if (pid === 0) {
    //   const tx = await masterChefContract.enterStaking(value, options)
    //   const receipt = await tx.wait()
    //   return receipt.status
    // }

    const tx = await masterChefContract.deposit(pid, value)
    const receipt = await tx.wait()
    return receipt.status
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
    const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
    // if (pid === 0) {
    //   const tx = await masterChefContract.withdraw(pid, 0)
    //   const receipt = await tx.wait()
    //   return receipt.status
    // }

    const tx = await masterChefContract.withdraw(pid, value)
    const receipt = await tx.wait()
    return receipt.status
}

export const harvestFarm = async (masterChefContract, pid, value) => {

    const tx = await await masterChefContract.withdraw(pid, value)
    const receipt = await tx.wait()
    return receipt.status
}
