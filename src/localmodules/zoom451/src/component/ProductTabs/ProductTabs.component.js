import PropTypes from 'prop-types';

import ContentWrapper from 'Component/ContentWrapper';
import ProductTab from 'Component/ProductTab';
import { ProductTabs as SrcProductTabs } from 'SourceComponent/ProductTabs/ProductTabs.component';
import { isMobile } from 'Util/Mobile';

import './ProductTabs.style';

/** @namespace Zoom451/Component/ProductTabs/Component/ProductTabsComponent */
export class ProductTabsComponent extends SrcProductTabs {
    static propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            render: PropTypes.func.isRequired
        })).isRequired,
        defaultTab: PropTypes.number
    };

    static defaultProps = {
        defaultTab: 0
    };

    renderActiveTab() {
        const { tabs } = this.props;
        const { activeTab } = this.state;

        return tabs[activeTab].render();
    }

    renderAllTabs() {
        const { tabs } = this.props;

        return tabs.map(({ render }) => render());
    }

    renderTab = (item, i) => {
        const { activeTab } = this.state;

        return (
            <ProductTab
              tabName={ item.name }
              key={ i }
              onClick={ this.onTabClick }
              isActive={ i === activeTab }
            />
        );
    };

    renderTabs() {
        const { tabs } = this.props;

        return (
            <>
                <ul block="ProductTabs">
                    { tabs.map(this.renderTab) }
                </ul>
                { isMobile.any() ? this.renderActiveTab() : this.renderActiveTab() }
            </>
        );
    }

    render() {
        return (
            <ContentWrapper
              wrapperMix={ { block: 'ProductTabs', elem: 'Wrapper' } }
              label={ __('Product tabs') }
            >
                { this.renderTabs() }
            </ContentWrapper>
        );
    }
}

export default ProductTabsComponent;
