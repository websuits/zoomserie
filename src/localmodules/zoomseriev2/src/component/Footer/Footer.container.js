import { connect } from 'react-redux';

import Footer from './Footer.component';

/** @namespace Zoomseriev2/Component/Footer/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    copyright: state.ConfigReducer.copyright,
    device: state.ConfigReducer.device,
    currentStoreCode: state.ConfigReducer.code
});

/** @namespace Zoomseriev2/Component/Footer/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
