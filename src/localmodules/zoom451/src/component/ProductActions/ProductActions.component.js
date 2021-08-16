import ProductConfigurableAttributes from 'Component/ProductConfigurableAttributes';
import { ProductActions as SrcProductActions } from 'SourceComponent/ProductActions/ProductActions.component';

/** @namespace Zoom451/Component/ProductActions/Component/ProductActionsComponent */
export class ProductActionsComponent extends SrcProductActions {
    renderLightDescription() {
        const { product: { light_description } } = this.props;
        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'light' } }
              aria-label="Product light description"
            >
                { light_description }
            </section>
        );
    }

    renderSkuAndStock() {
        const {
            product,
            product: { variants },
            configurableVariantIndex,
            displayProductStockStatus
        } = this.props;

        const productOrVariant = variants && variants[configurableVariantIndex] !== undefined
            ? variants[configurableVariantIndex]
            : product;

        const { stock_status } = productOrVariant;

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'sku' } }
              aria-label="Product SKU and availability"
            >
                { displayProductStockStatus && this.renderStock(stock_status) }
            </section>
        );
    }

    renderConfigurableAttributes() {
        const {
            getLink,
            updateConfigurableVariant,
            parameters,
            areDetailsLoaded,
            product: { configurable_options, type_id },
            getIsConfigurableAttributeAvailable
        } = this.props;

        if (type_id !== 'configurable') {
            return null;
        }

        return (
            <div
              ref={ this.configurableOptionsRef }
              block="ProductActions"
              elem="AttributesWrapper"
            >
                <ProductConfigurableAttributes
                  // eslint-disable-next-line no-magic-numbers
                  numberOfPlaceholders={ [2, 4] }
                  mix={ { block: 'ProductActions', elem: 'Attributes' } }
                  isReady={ areDetailsLoaded }
                  getLink={ getLink }
                  parameters={ parameters }
                  updateConfigurableVariant={ updateConfigurableVariant }
                  configurable_options={ configurable_options }
                  getIsConfigurableAttributeAvailable={ getIsConfigurableAttributeAvailable }
                  isContentExpanded
                />
                <a
                  href={ window.location.pathname }
                >
                    { __('Reset choices') }
                </a>
            </div>
        );
    }

    render() {
        return (
            <>
                <article block="ProductActions">
                    <div
                      block="ProductActions_First"
                      elem="AddToCartWrapper"
                      mix={ { block: 'FixedElement', elem: 'Bottom' } }
                    >
                        { this.renderNameAndBrand() }
                        { this.renderSkuAndStock() }
                        { this.renderConfigurableAttributes() }
                        { this.renderBundleItems() }
                        { this.renderGroupedItems() }
                        { this.renderDownloadableProductSample() }
                        { this.renderReviews() }
                    </div>
                    <div
                      block="ProductActions_Second"
                      elem="AddToCartWrapper"
                      mix={ { block: 'FixedElement', elem: 'Bottom' } }
                    >
                        { this.renderPriceWithGlobalSchema() }
                        { this.renderTierPrices() }
                        { this.renderShortDescription() }
                        { this.renderCustomizableOptions() }
                        { this.renderLightDescription() }
                        { this.renderQuantityInput() }
                        { this.renderAddToCart() }
                    </div>
                </article>
                { this.renderDownloadableProductLinks() }
            </>
        );
    }
}

export default ProductActionsComponent;
