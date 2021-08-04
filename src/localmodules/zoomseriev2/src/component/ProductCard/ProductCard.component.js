import { ProductCard as SrcProductCard } from 'SourceComponent/ProductCard/ProductCard.component';

/** @namespace Zoomseriev2/Component/ProductCard/Component/ProductCardComponent */
export class ProductCardComponent extends SrcProductCard {
    renderVisualConfigurableOptions() {
        const {
            siblingsHaveConfigurableOptions,
            setSiblingsHaveConfigurableOptions,
            measurement
        } = this.props;

        if (!siblingsHaveConfigurableOptions) {
            setSiblingsHaveConfigurableOptions();
        }

        return (
            <div block="ProductCard" elem="ConfigurableOptions">
                { measurement.map(this.renderVisualOption) }
            </div>
        );
    }

    renderVisualOption = ({ label, value }, i) => (
            <span
              block="ProductCard"
              elem="String"
              key={ i }
              // style={ isColor ? { backgroundColor: value } : {} }
              aria-label=""
              title={ label }
            >
                /
                { value }
            </span>
    );

    renderCardContent() {
        const { renderContent } = this.props;

        if (renderContent) {
            return renderContent(this.contentObject);
        }

        return (
            this.renderCardLinkWrapper((
                <>
                    <div block="ProductCard" elem="FigureReview">
                        <figure block="ProductCard" elem="Figure">
                            { this.renderPicture() }
                        </figure>
                        { this.renderReviews() }
                    </div>
                    <div block="ProductCard" elem="Content">
                        { this.renderAdditionalProductDetails() }
                        { this.renderMainDetails() }
                        <div className="ProductCard-InlinePrice">
                            { this.renderProductPrice() }
                            { this.renderVisualConfigurableOptions() }
                        </div>
                    </div>
                </>
            ))
        );
    }
}
export default ProductCardComponent;
