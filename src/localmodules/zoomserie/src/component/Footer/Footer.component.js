import PropTypes from 'prop-types';
import React from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import { Footer as SrcFooter } from 'SourceComponent/Footer/Footer.component';

import CmsBlock from '../../../scandipwa/src/component/CmsBlock/CmsBlock.container';
/** @namespace Zoomserie/Component/Footer/Component/FooterComponent */
export class FooterComponent extends SrcFooter {
    static propTypes = {
        currentStoreCode: PropTypes.string
    };

    renderContent() {
        return (
            <CmsBlock identifier="footer_cms" />
        );
    }

    renderCopyrightContent() {
        const { copyright } = this.props;

        return (
            <ContentWrapper
              mix={ { block: 'Footer', elem: 'CopyrightContentWrapper' } }
              wrapperMix={ { block: 'Footer', elem: 'CopyrightContent' } }
              label=""
            >
                <span block="Footer" elem="Copyright">
                    { copyright }
                </span>
                <div className="Footer-Crafted">
                    <img
                      block="ProductAttributeValue"
                      elem="MediaImage"
                      src="/media/zoomserie/footer-crafted.png"
                      alt="Crafted by Grin - creative agency"
                    />
                    <span>
                        Crafted by
                        <strong>Grin - creative agency.</strong>
                    </span>
                </div>
            </ContentWrapper>
        );
    }

    render() {
        const { isVisibleOnMobile, device } = this.props;
        const { currentStoreCode } = this.props;

        if (currentStoreCode === 'default') {
            return null;
        }

        if (!isVisibleOnMobile && device.isMobile) {
            return null;
        }

        if (isVisibleOnMobile && !device.isMobile) {
            return null;
        }

        return (
            <footer block="Footer" aria-label="Footer">
                { this.renderContent() }
                { this.renderCopyrightContent() }
            </footer>
        );
    }
}

export default FooterComponent;
