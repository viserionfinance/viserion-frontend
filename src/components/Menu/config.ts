import { MenuEntry } from 'uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
    {
        label: t('Home'),
        icon: 'HomeIcon',
        href: '/',
    },
    // {
    //     label: t('Trade'),
    //     icon: 'TradeIcon',
    //     items: [
    //         {
    //             label: t('Exchange'),
    //             href: '/swap',
    //         },
    //         {
    //             label: t('Liquidity'),
    //             href: '/pool',
    //         },
    //     ],
    // },
    {
        label: t('Farms'),
        icon: 'FarmIcon',
        href: '/farms',
    },
    {
        label: t('Treasure'),
        icon: 'PoolIcon',
        href: '/treasure',
    },
    {
        label: t('IDO'),
        icon: 'IdoIcon',
        href: '/ido',
    },
    // {
    //     label: t('NFT'),
    //     icon: 'NftIcon',
    //     href: '/nft'
    // },
    {
        label: t('Info'),
        icon: 'InfoIcon',
        items: [
            {
                label: t('Audit'),
                href: '',
            }
        ],
    },
    {
        label: t('More'),
        icon: 'MoreIcon',
        items: [
            {
                label: t('Docs'),
                href: 'https://docs.viserion.finance',
            },
            {
                label: t('Whitepaper'),
                href: 'https://viserion.finance/ViserionFinance-whitepaper.pdf',
            },
            {
                label: t('Telegram'),
                href: 'https://t.me/viserion_metis',
            },
            {
                label: t('Twitter'),
                href: 'https://twitter.com/ViserionFinance',
            },
            {
                label: t('Discord'),
                href: 'https://discord.gg/QmzZ6xz7s8',
            },
        ],
    },
]

export default config
