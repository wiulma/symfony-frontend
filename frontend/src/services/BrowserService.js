export function isMicrosoftBrowser() {
    return ((/*@cc_on!@*/false) || (document.documentMode)) ||
        (!(document.documentMode) && window.StyleMedia);
} 