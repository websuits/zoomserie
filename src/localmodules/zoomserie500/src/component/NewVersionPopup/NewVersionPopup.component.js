import PropTypes from 'prop-types';

import { NewVersionPopup as SrcNewVersionPopup } from 'SourceComponent/NewVersionPopup/NewVersionPopup.component';

/** @namespace Zoomserie500/Component/NewVersionPopup/Component/NewVersionPopupComponent */
export class NewVersionPopupComponent extends SrcNewVersionPopup {
    static propTypes = {
        toggleNewVersion: PropTypes.func.isRequired,
        handleDismiss: PropTypes.func.isRequired
    };

    render() {
        return null;
    }
}

export default NewVersionPopupComponent;
