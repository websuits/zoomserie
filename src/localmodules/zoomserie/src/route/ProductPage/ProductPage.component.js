import ProductActions from 'Component/ProductActions';
import ProductGallery from 'Component/ProductGallery';
import { ProductPage as SrcProductPage } from 'SourceRoute/ProductPage/ProductPage.component';
import {
    PRODUCT_INFORMATION,
    PRODUCT_REVIEWS
} from 'SourceRoute/ProductPage/ProductPage.config';

/** @namespace Zoomserie/Route/ProductPage/Component/ProductPageComponent */
export class ProductPageComponent extends SrcProductPage {
    tabMap = {
        [PRODUCT_INFORMATION]: {
            name: __('About'),
            shouldTabRender: () => {
                const { isInformationTabEmpty } = this.props;
                return isInformationTabEmpty;
            },
            render: (key) => this.renderProductInformationTab(key)
        },
        [PRODUCT_REVIEWS]: {
            name: __('Reviews'),
            // Return false since it always returns 'Add review' button
            shouldTabRender: () => false,
            render: (key) => this.renderProductReviewsTab(key)
        }
    };

    renderProductPageContent() {
        const {
            configurableVariantIndex,
            parameters,
            getLink,
            dataSource,
            updateConfigurableVariant,
            productOrVariant,
            areDetailsLoaded,
            getSelectedCustomizableOptions,
            productOptionsData,
            setBundlePrice,
            selectedBundlePrice,
            selectedBundlePriceExclTax,
            setLinkedDownloadables,
            setLinkedDownloadablesPrice,
            selectedLinkPrice
        } = this.props;

        return (
            <>
                <ProductGallery
                  product={ productOrVariant }
                  areDetailsLoaded={ areDetailsLoaded }
                />
                <ProductActions
                  getLink={ getLink }
                  updateConfigurableVariant={ updateConfigurableVariant }
                  product={ dataSource }
                  productOrVariant={ productOrVariant }
                  parameters={ parameters }
                  areDetailsLoaded={ areDetailsLoaded }
                  configurableVariantIndex={ configurableVariantIndex }
                  getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
                  productOptionsData={ productOptionsData }
                  setBundlePrice={ setBundlePrice }
                  selectedBundlePrice={ selectedBundlePrice }
                  selectedBundlePriceExclTax={ selectedBundlePriceExclTax }
                  setLinkedDownloadables={ setLinkedDownloadables }
                  setLinkedDownloadablesPrice={ setLinkedDownloadablesPrice }
                  selectedLinkPrice={ selectedLinkPrice }
                />
            </>
        );
    }

    renderProductTabs() {
        return (
            // eslint-disable-next-line react/jsx-no-undef
            <div>
                { this.renderProductTabItems() }
            </div>
        );
    }
}
export default ProductPageComponent;
