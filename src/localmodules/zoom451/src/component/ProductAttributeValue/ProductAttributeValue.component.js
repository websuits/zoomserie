/* eslint-disable no-magic-numbers */
// eslint-disable-next-line max-len
import { ProductAttributeValue as SrcProductAttributeValue } from 'SourceComponent/ProductAttributeValue/ProductAttributeValue.component';

/** @namespace Zoom451/Component/ProductAttributeValue/Component/ProductAttributeValueComponent */
export class ProductAttributeValueComponent extends SrcProductAttributeValue {
    static defaultProps = {
        isSelected: true,
        onClick: () => {},
        getLink: () => {},
        mix: {},
        isAvailable: true,
        isFormattedAsText: false,
        isProductCountVisible: false
    };

    renderTextAttribute() {
        const { attribute: { attribute_value } } = this.props;
        return this.renderStringValue(attribute_value);
    }

    render() {
        const {
            getLink,
            attribute,
            isAvailable,
            attribute: { attribute_code, attribute_value },
            mix,
            isFormattedAsText
        } = this.props;

        if (attribute_code && !attribute_value) {
            return null;
        }

        const href = getLink(attribute);
        // Invert to apply css rule without using not()
        const isNotAvailable = !isAvailable;

        if (isFormattedAsText) {
            return (
                <div
                  block="ProductAttributeValue"
                  mix={ mix }
                >
                    { this.renderAttributeByType() }
                </div>
            );
        }

        return (
            <a
              href={ href }
              block="ProductAttributeValue"
              mods={ { isNotAvailable } }
              onClick={ this.clickHandler }
              aria-hidden={ isNotAvailable }
              mix={ mix }
            >
                { this.renderAttributeByType() }
            </a>
        );
    }
}

export default ProductAttributeValueComponent;
