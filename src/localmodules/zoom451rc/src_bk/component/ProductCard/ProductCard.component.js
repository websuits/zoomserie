import {
    OPTION_TYPE_IMAGE
} from '@scandipwa/scandipwa/src/component/ProductCard/ProductCard.config';

import { ProductCard as SrcProductCard } from 'SourceComponent/ProductCard/ProductCard.component';

/** @namespace Zoom451rc/Component/ProductCard/Component/ProductCardComponent */
export class ProductCardComponent extends SrcProductCard {
    renderVisualConfigurableOptions() {
        const {
            availableVisualOptions
        } = this.props;

        return (
            <div block="ProductCard" elem="ConfigurableOptions">
                { availableVisualOptions.map(this.renderVisualOption) }
            </div>
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
