import { connect } from 'react-redux';

import Footer from './Footer.component';

/** @namespace Zoom451rc/Component/Footer/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    copyright: state.ConfigReducer.copyright,
    device: state.ConfigReducer.device,
    currentStoreCode: state.ConfigReducer.code
});

/** @namespace Zoom451rc/Component/Footer/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
