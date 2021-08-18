/* eslint-disable no-undef */
import {
    OPTION_TYPE_IMAGE
} from '@scandipwa/scandipwa/src/component/ProductCard/ProductCard.config';

import { ProductCard as SrcProductCard } from 'SourceComponent/ProductCard/ProductCard.component';

/** @namespace Zoom451/Component/ProductCard/Component/ProductCardComponent */
export class ProductCardComponent extends SrcProductCard {
    renderVisualConfigurableOptions() {
        const {
            product,
            availableVisualOptions
        } = this.props;

        console.log(product);
        return (
            <div block="ProductCard" elem="ConfigurableOptions">
                { availableVisualOptions.map(this.renderVisualOption) }
            </div>
        );
    }

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
                        { this.renderProductPrice() }
                        { this.renderVisualConfigurableOptions() }
                    </div>
                </>
            ))
        );
    }

    renderVisualOption = ({ label, value, type }, i) => {
        if (type === OPTION_TYPE_IMAGE) {
            return this.renderImageVisualOption(label, value, i);
        }

        return (
            <span
              block="ProductCard"
              elem="String"
              key={ i }
              aria-label=""
              title={ label }
            >
                <div className="ProductCard-StringSeparator">/</div>
                { value }
            </span>
        );
    };
}
export default ProductCardComponent;
