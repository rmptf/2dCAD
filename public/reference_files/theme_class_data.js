const COLORVARS = {
    THEMECLASS: {
        defaultThemeClass: "",
        secondaryThemeClass: "module-theme_secondary",
        tertiaryThemeClass: "module-theme_tertiary",
    },
    COLORS: {
        main: "theme-color__main",
        mainMuted: "theme-color__main--muted",
        accentPrimary: "theme-color__accent-primary",
        accentPrimaryMuted: "theme-color__accent-primary--muted",
        accentSecondary: "theme-color__accent-secondary",
        accentSecondaryMuted: "theme-color__accent-secondary--muted",
        alertSuccess: "theme-color__alert-success",
        alertDanger: "theme-color__alert-danger",
        alertWarning: "theme-color__alert-warning",
        alertInfo: "theme-color__alert-info",
        alertPrimary: "theme-color__alert-primary",
        alertSecondary: "theme-color__alert-secondary",
        alertDisabled: "theme-color__state-disabled",
        bw00: "color__bw00",
        bw10: "color__bw10",
        bw20: "color__bw20",
        bw30: "color__bw30",
        bw40: "color__bw40",
        bw50: "color__bw50",
        bw60: "color__bw60",
        bw70: "color__bw70",
        bw80: "color__bw80",
        bw90: "color__bw90",
        hl10: "color__hl10",
        hl20: "color__hl20",
        hl30: "color__hl30",
        hl40: "color__hl40",
        hl50: "color__hl50",
        hl60: "color__hl60",
        hl70: "color__hl70",
        hl80: "color__hl80",
        hl90: "color__hl90",
    },
    FILLS: {
        mainFill: "theme-fill__main",
        mainMutedFill: "theme-fill__main--muted",
        accentPrimaryFill: "theme-fill__accent-primary",
        accentPrimaryMutedFill: "theme-fill__accent-primary--muted",
        accentSecondaryFill: "theme-fill__accent-secondary",
        accentSecondaryMutedFill: "theme-fill__accent-secondary--muted",
        alertSuccess: "theme-fill__alert-success",
        alertDanger: "theme-fill__alert-danger",
        alertWarning: "theme-fill__alert-warning",
        alertInfo: "theme-fill__alert-info",
        alertPrimary: "theme-fill__alert-primary",
        alertSecondary: "theme-fill__alert-secondary",
        alertDisabled: "theme-fill__state-disabled",
        bw00: "fill__bw00",
        bw10: "fill__bw10",
        bw20: "fill__bw20",
        bw30: "fill__bw30",
        bw40: "fill__bw40",
        bw50: "fill__bw50",
        bw60: "fill__bw60",
        bw70: "fill__bw70",
        bw80: "fill__bw80",
        bw90: "fill__bw90",
        hl10: "fill__hl10",
        hl20: "fill__hl20",
        hl30: "fill__hl30",
        hl40: "fill__hl40",
        hl50: "fill__hl50",
        hl60: "fill__hl60",
        hl70: "fill__hl70",
        hl80: "fill__hl80",
        hl90: "fill__hl90",
    },
    HOVERS: {
        COLOR: {
            accentPrimaryHover: "theme-color__accent-primary--hover",
            accentSecondaryMutedHover: "theme-color__accent-secondary--muted--hover",
        },
        FILL: {
            translucentOverlayHoverFill: "theme-fill__translucent-overlay--hover",
        },    
    },
    BORDERS: {
        mainBorderColor: "theme-color__main--border-color",
        translucentOverlayBorderColor: "theme-color__translucent-overlay--border-color",
    },
}

const WIDTHVARS = {
    MAXWIDTHS: {
        maxWidthNarrowest: "max-width__narrowest",
        maxWidthNarrower: "max-width__narrower",
        maxWidthNarrow: "max-width__narrow",
        maxWidthWide: "max-width__wide",
        maxWidthWider: "max-width__wider",
        maxWidthUnset: "max-width__unset",
    },
}

const BTNVARS = {
    BTNCLASS: {
        aButton: "a-button"
    },
    BTNTYPES: {
        default: "a-button__a-btn--default"
    },
    BTNSIZES: {
        extraSmall: "",
        small: "a-btn__default--small",
        medium: "a-btn__default--medium",
        large: "",
    },
    BTNSTATUS: {
        primary: "button--primary",
        secondary: "button--secondary",
        disabled: "button--disabled",
        success: "button--success",
        danger: "button--danger",
        warning: "button--warning",
        info: "button--info",

    },
    BTNSTYLE: {
        contained: "button--contained",
        outlined: "button--outlined",
        text: "button--text",
    }
}

module.exports = { 
    COLORVARS,
    WIDTHVARS,
    BTNVARS,
}