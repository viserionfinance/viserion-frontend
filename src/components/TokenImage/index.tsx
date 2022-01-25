import React from 'react'
import {
    ImageProps,
    TokenImage as UIKitTokenImage,
    TokenPairImage as UIKitTokenPairImage,
    TokenPairImageProps as UIKitTokenPairImageProps,
} from 'uikit'
import {Token} from 'config/constants/types'

interface TokenPairImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
    primaryToken: Token
    secondaryToken: Token
}

const getImageUrlFromToken = (token: Token, token2?: Token, isPool?: any) => {
    // const address = getAddress(token.symbol === 'RNA' ? tokens.wrna.address : token.address)
    const firstUrl = token.symbol.toUpperCase() === 'METIS' ? 'METIS' : token.symbol
    if (isPool) {
        return `/images/stake/${token2.symbol.toUpperCase()}.png`
    }
    return `/images/farms/${firstUrl.toUpperCase()}-${token2.symbol.toUpperCase()}.png`
}

export const TokenPairImage: React.FC<TokenPairImageProps> = ({primaryToken, secondaryToken, isPool, ...props}) => {
    return (
        <UIKitTokenPairImage
            primarySrc={getImageUrlFromToken(primaryToken, secondaryToken, isPool)}
            secondarySrc={getImageUrlFromToken(secondaryToken, secondaryToken)}
            {...props}
        />
    )
}

interface TokenImageProps extends ImageProps {
    token: Token;
}

export const TokenImage: React.FC<TokenImageProps> = ({token, ...props}) => {
    return <UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />
}
