import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const DeviceType = PropTypes.shape({
    isMobile: PropTypes.bool,
    isTablet: PropTypes.bool,
    tablet: PropTypes.bool,
    android: PropTypes.bool,
    ios: PropTypes.bool,
    blackberry: PropTypes.bool,
    opera: PropTypes.bool,
    safari: PropTypes.bool,
    windows: PropTypes.bool,
    standaloneMode: PropTypes.bool
});
