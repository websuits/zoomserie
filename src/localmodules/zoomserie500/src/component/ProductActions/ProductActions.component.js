import { ProductActions as SrcProductActions } from 'SourceComponent/ProductActions/ProductActions.component';

/** @namespace Zoomserie500/Component/ProductActions/Component/ProductActionsComponent */
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
