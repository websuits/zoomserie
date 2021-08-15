import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONTACT_US } from 'Component/Header/Header.config';
import ContactFormQuery from 'Query/ContactForm.query';
import { ContactPageContainer as SrcContactPage } from 'SourceRoute/ContactPage/ContactPage.container';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';

import ContactPage from './ContactPage.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Zoom451/Route/ContactPage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Zoom451/Route/ContactPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    setHeaderState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    }
});

/** @namespace Zoom451/Route/ContactPage/Container/ContactPageContainer */
export class ContactPageContainer extends SrcContactPage {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired
    };

    state = {
        isLoading: false,
        isEnabled: false
    };

    componentDidMount() {
        this.updateMeta();
        this.updateBreadcrumbs();
        this.updateHeader();
        this.getEnabledState();
    }

    updateMeta() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('Special Orders') });
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/comenzi-speciale',
                name: __('Special Orders')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    updateHeader() {
        const { setHeaderState } = this.props;

        setHeaderState({
            name: CONTACT_US,
            title: __('Special Orders')
        });
    }

    getEnabledState() {
        const { showNotification } = this.props;
        this.setState({ isLoading: true });

        this.fetchData(
            ContactFormQuery.getContactPageConfigQuery(),
            ({ contactPageConfig: { enabled } = {} }) => {
                this.setState({ isEnabled: enabled, isLoading: false });
            },
            ([e]) => {
                this.setState({ isLoading: false });
                showNotification(e.message);
            }
        );
    }

    render() {
        return (
            <ContactPage
              /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
              { ...this.state }
              /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
              { ...this.props }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPageContainer);
