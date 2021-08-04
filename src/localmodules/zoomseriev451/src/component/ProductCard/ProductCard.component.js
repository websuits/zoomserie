import { ProductCard as SrcProductCard } from 'SourceComponent/ProductCard/ProductCard.component';

/** @namespace Zoomseriev451/Component/ProductCard/Component/ProductCardComponent */
export class ProductCardComponent extends SrcProductCard {
    renderVisualOption({ label, value }, i) {
        return (
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
    }
}
export default ProductCardComponent;
