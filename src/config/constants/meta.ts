import {ContextApi} from 'contexts/Localization/types'
import {PageMeta} from './types'

export const DEFAULT_META: PageMeta = {
    title: 'VeFI',
    description:
        'VeFI Finance',
    image: 'https://viserion.finance/meta.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
    switch (path) {
        case '/':
            return {
                title: `${t('Home')} | ${t('VeFI')}`,
            }
        case '/competition':
            return {
                title: `${t('Trading Battle')} | ${t('VeFI')}`,
            }
        case '/prediction':
            return {
                title: `${t('Prediction')} | ${t('VeFI')}`,
            }
        case '/farms':
            return {
                title: `${t('Farms')} | ${t('VeFI')}`,
            }
        case '/pools':
            return {
                title: `${t('Pools')} | ${t('VeFI')}`,
            }
        case '/lottery':
            return {
                title: `${t('Lottery')} | ${t('VeFI')}`,
            }
        case '/collectibles':
            return {
                title: `${t('Collectibles')} | ${t('VeFI')}`,
            }
        case '/ifo':
            return {
                title: `${t('Initial Farm Offering')} | ${t('VeFI')}`,
            }
        case '/teams':
            return {
                title: `${t('Leaderboard')} | ${t('VeFI')}`,
            }
        case '/profile/tasks':
            return {
                title: `${t('Task Center')} | ${t('VeFI')}`,
            }
        case '/profile':
            return {
                title: `${t('Your Profile')} | ${t('VeFI')}`,
            }
        default:
            return null
    }
}
