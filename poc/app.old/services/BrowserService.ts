export function isMicrosoftBrowser() {
    let ie = false;
    return ((/*@cc_on!@*/false) || (document.documentMode)) ||
        (!(document.documentMode) && window.StyleMedia);
} 