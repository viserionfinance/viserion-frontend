import {Colors} from "./types";

export const baseColors = {
    failure: "#ED4B9E",
    primary: "#0061ff",
    primaryBright: "#53DEE9",
    primaryDark: "#0098A1",
    secondary: "#0061ff",
    success: "#31D0AA",
    warning: "#FFB237",
};

export const additionalColors = {
    binance: "#F0B90B",
    overlay: "#452a7a",
};

export const lightColors: Colors = {
    ...baseColors,
    ...additionalColors,
    background: "rgba(0,0,0,0.35)",
    backgroundDisabled: "#E9EAEB",
    backgroundAlt: "rgba(0,0,0,0.25)",
    cardBorder: "#0061ff",
    contrast: "#0061ff",
    dropdown: "#F6F6F6",
    dropdownDeep: "#EEEEEE",
    invertedContrast: "#FFFFFF",
    input: "#00000036",
    inputSecondary: "#d7caec",
    tertiary: "linear-gradient(90deg, rgba(0,97,255,1) 0%, rgba(0,97,255,0.08589373249299714) 100%);",
    text: "#E7E3EB",
    textDisabled: "#BDC2C4",
    textSubtle: "#E7E3EB",
    disabled: "#E9EAEB",
    gradients: {
        bubblegum: "linear-gradient(139.73deg, rgb(170, 170, 170) 0%, rgb(221, 221, 221) 100%)",
        inverseBubblegum: "linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)",
        cardHeader: "#00000036",
        blue: "linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)",
        violet: "linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)",
        violetAlt: "linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)",
        gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
    },
    backgroundModal: "rgba(0,0,0,0.93)"
};

export const darkColors: Colors = {
    ...baseColors,
    ...additionalColors,
    secondary: "#9A6AFF",
    background: "#08060B",
    backgroundDisabled: "#3c3742",
    backgroundAlt: "#27262c",
    cardBorder: "#0061ff",
    contrast: "#FFFFFF",
    dropdown: "#1E1D20",
    dropdownDeep: "#100C18",
    invertedContrast: "#191326",
    input: "#372F47",
    inputSecondary: "#262130",
    primaryDark: "#0098A1",
    tertiary: "#353547",
    text: "#F4EEFF",
    textDisabled: "#666171",
    textSubtle: "#B8ADD2",
    disabled: "#524B63",
    gradients: {
        bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
        inverseBubblegum: "linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)",
        cardHeader: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
        blue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
        violet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
        violetAlt: "linear-gradient(180deg, #434575 0%, #66578D 100%)",
        gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
    },
};
