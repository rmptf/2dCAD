const COLORVARS = {
    // MODECLASS: {
    //     lightModeClass: "mode-theme_light",
    //     darkModeClass: "mode-theme_dark",
    // },
    THEMECLASS: {
        defaultThemeClass: "",
        secondaryThemeClass: "module-theme_secondary",
        tertiaryThemeClass: "module-theme_tertiary",
    },
    COLORS: {
        main: "clr-theme__main",
        mainMuted: "clr-theme__main--muted",
        accentPrimary: "clr-theme__accent-primary",
        accentPrimaryMuted: "clr-theme__accent-primary--muted",
        accentSecondary: "clr-theme__accent-secondary",
        accentSecondaryMuted: "clr-theme__accent-secondary--muted",
    },
    FILLS: {
        mainFill: "clr-theme__main--fill",
        mainMutedFill: "clr-theme__main--muted--fill",
        accentPrimaryFill: "clr-theme__accent-primary--fill",
        accentPrimaryMutedFill: "clr-theme__accent-primary--muted--fill",
        accentSecondaryFill: "clr-theme__accent-secondary--fill",
        accentSecondaryMutedFill: "clr-theme__accent-secondary--muted--fill",
    },
    HOVERS: {
        COLOR: {
            accentPrimaryHover: "clr-theme__accent-primary--hover",
            accentSecondaryMutedHover: "clr-theme__accent-secondary--muted--hover",
        },
        FILL: {
            translucentOverlayHoverFill: "clr-theme__translucent-overlay--fill--hover",
        },    
    },
    BORDERS: {
        mainBorderColor: "clr-theme__main--border-color",
        translucentOverlayBorderColor: "clr-theme__translucent-overlay--border-color",
    },
    OPACITY: {
        op90: "opacity--90",
        op80: "opacity--80",
        op70: "opacity--70",
        op60: "opacity--60",
        op50: "opacity--50",
        op40: "opacity--40",
        op30: "opacity--30",
        op20: "opacity--20",
        op10: "opacity--10",
    }
}

const WIDTHVARS = {
    MAXWIDTHS: {
        maxWidthNarrowest: "max-width__narrowest",
        maxWidthNarrower: "max-width__narrower",
        maxWidthNarrow: "max-width__narrow",
        maxWidthWide: "max-width__wide",
        maxWidthWider: "max-width__wider",
        maxWidthWidest: "max-width__widest",
    },
}

module.exports = { 
    COLORVARS,
    WIDTHVARS,
}