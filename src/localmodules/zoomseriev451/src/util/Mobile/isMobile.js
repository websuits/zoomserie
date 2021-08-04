export const isUsingClientHints = 'userAgentData' in navigator;

export const isMobile = {
    android: (agent = navigator.userAgent) => /android/i.test(agent),
    blackBerry: (agent = navigator.userAgent) => /blackberry/i.test(agent),
    iOS: (agent = navigator.userAgent) => /iphone|ipod|ipad/i.test(agent),
    opera: (agent = navigator.userAgent) => /opera mini/i.test(agent),
    safari: (agent = navigator.userAgent) => /safari/i.test(agent) && !/chrome/i.test(agent),
    windows: (agent = navigator.userAgent) => /iemobile/i.test(agent),
    // iPad uses 810 so we need to handle that.
    any: () => window.matchMedia('(max-width: 810px)').matches,
    tablet: () => window.matchMedia('(min-width:810px) and (max-width: 1024px)').matches,
    standaloneMode: () => window.matchMedia('(display-mode: standalone)').matches
};

// https://medium.com/@galmeiri/get-ready-for-chrome-user-agent-string-phase-out-c6840da1c31e
export const isMobileClientHints = {
    getDeviceData: () => navigator.userAgentData.getHighEntropyValues(['platform', 'model'])
};

export default isMobile;
