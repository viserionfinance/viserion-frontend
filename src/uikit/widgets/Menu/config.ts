import {LinkStatus} from "./types";

export const status = {
    LIVE: <LinkStatus>{
        text: "LIVE",
        color: "failure",
    },
    SOON: <LinkStatus>{
        text: "SOON",
        color: "warning",
    },
    NEW: <LinkStatus>{
        text: "NEW",
        color: "success",
    },
};

export const links = [
    {
        label: "Home",
        icon: "HomeIcon",
        href: "/",
    },
    {
        label: "Trade",
        icon: "TradeIcon",
        items: [
            {
                label: "Exchange",
                href: "#",
            },
            {
                label: "Liquidity",
                href: "#",
            },
        ],
    },
    {
        label: "Farms",
        icon: "FarmIcon",
        href: "/farms",
        status: status.LIVE,
    },
    {
        label: "Pools",
        icon: "PoolIcon",
        href: "/syrup",
    },
    {
        label: "Info",
        icon: "InfoIcon",
        items: [
            {
                label: "Overview",
                href: "https://pancakeswap.info",
            },
            {
                label: "Tokens",
                href: "https://pancakeswap.info/tokens",
            },
            {
                label: "Pairs",
                href: "https://pancakeswap.info/pairs",
            },
            {
                label: "Accounts",
                href: "https://pancakeswap.info/accounts",
            },
        ],
    },
    {
        label: "IFO",
        icon: "IfoIcon",
        items: [
            {
                label: "Next",
                href: "/ifo",
            },
            {
                label: "History",
                href: "/ifo/history",
            },
        ],
    },
    {
        label: "More",
        icon: "MoreIcon",
        items: [
            {
                label: "Voting",
                href: "",
            },
            {
                label: "Github",
                href: "",
            },
            {
                label: "Docs",
                href: "",
            },
            {
                label: "Blog",
                href: "",
            },
        ],
    },
];

export const socials = [
    {
        label: "Telegram",
        icon: "TelegramIcon",
        items: [
            {
                label: "Global",
                href: "https://t.me/viserion_metis",
            },
            {
                label: "Chinese",
                href: "https://t.me/Viserion_Chinese",
            },
        ],
    },
    {
        label: "Twitter",
        icon: "TwitterIcon",
        href: "https://twitter.com/ViserionFinance"
    },
    {
        label: "Discord",
        icon: "DiscordIcon",
        href: "https://discord.gg/QmzZ6xz7s8"
    }
];

export const MENU_HEIGHT = 64;
export const MENU_ENTRY_HEIGHT = 48;
export const SIDEBAR_WIDTH_FULL = 240;
export const SIDEBAR_WIDTH_REDUCED = 56;
