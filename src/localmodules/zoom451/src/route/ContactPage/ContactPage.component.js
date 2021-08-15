import PropTypes from 'prop-types';

import CmsBlock from 'Component/CmsBlock';
import ContactForm from 'Component/ContactForm';
import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import NoMatch from 'Route/NoMatch';
import { ContactPage as SrcContactPage } from 'SourceRoute/ContactPage/ContactPage.component';
import { DeviceType } from 'Type/Device';

import { DEFAULT_CONTACT_US_CMS_BLOCK } from './ContactPage.config';

import './ContactPage.style';

/** @namespace Zoom451/Route/ContactPage/Component/ContactPageComponent */
export class ContactPageComponent extends SrcContactPage {
    static propTypes = {
        isLoading: PropTypes.bool,
        isEnabled: PropTypes.bool.isRequired,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        isLoading: false
    };

    renderHeading() {
        const { device } = this.props;

        if (device.isMobile) {
            return null;
        }

        return (
            <h1 block="ContactPage" elem="Heading">
                { __('Special Orders') }
            </h1>
        );
    }

    renderCmsBlock() {
        const {
            contact_us_content: {
                contact_us_cms_block = DEFAULT_CONTACT_US_CMS_BLOCK
            } = {}
        } = window.contentConfiguration;

        return <CmsBlock identifier={ contact_us_cms_block } />;
    }

    renderPage() {
        return (
            <ContentWrapper label="Special Orders Page">
                { this.renderHeading() }
                <div block="ContactPage" elem="ColumnWrapper">
                    <div block="ContactPage" elem="Column" mods={ { isContent: true } }>
                        { this.renderCmsBlock() }
                    </div>
                    <div block="ContactPage" elem="Column">
                        <ContactForm />
                    </div>
                </div>
            </ContentWrapper>
        );
    }

    renderNoPage() {
        return <NoMatch />;
    }

    renderPageContents() {
        const { isEnabled, isLoading } = this.props;

        if (isEnabled) {
            return this.renderPage();
        }

        if (!isLoading) {
            return this.renderNoPage();
        }

        return null;
    }

    render() {
        const { isLoading } = this.props;

        return (
            <main block="ContactPage">
                <Loader isLoading={ isLoading } />
                { this.renderPageContents() }
            </main>
        );
    }
}

export default SrcContactPage;
