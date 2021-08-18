/* eslint-disable max-len */
import PropTypes from 'prop-types';

import ExpandableContent from 'Component/ExpandableContent';
// import ExpandableContentShowMore from 'Component/ExpandableContentShowMore';
import ProductAttributeValue from 'Component/ProductAttributeValue/ProductAttributeValue.component';
import ProductConfigurableAttributes from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.component';
import { CategoryConfigurableAttributes as SrcCategoryConfigurableAttributes } from 'SourceComponent/CategoryConfigurableAttributes/CategoryConfigurableAttributes.component';
import { CategoryFragment } from 'Type/Category';
import { formatPrice } from 'Util/Price';
import { sortBySortOrder } from 'Util/Product';

/** @namespace Zoom451/Component/CategoryConfigurableAttributes/Component/CategoryConfigurableAttributesComponent */
export class CategoryConfigurableAttributesComponent extends SrcCategoryConfigurableAttributes {
    static propTypes = {
        ...ProductConfigurableAttributes.propTypes,
        currency_code: PropTypes.string.isRequired,
        show_product_count: PropTypes.bool.isRequired,
        childrenCategories: PropTypes.arrayOf(PropTypes.shape(CategoryFragment)).isRequired,
        getSubCategories: PropTypes.func.isRequired
    };

    renderSubCategories(option) {
        const { getSubCategories } = this.props;

        const optionWithSubcategories = getSubCategories(option);
        const { attribute_values = [] } = optionWithSubcategories;

        if (!attribute_values.length) {
            return null;
        }

        return this.renderDropdownOrSwatch(optionWithSubcategories);
    }

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    getPriceLabel(option) {
        const { currency_code } = this.props;
        const { label } = option;
        const [from, to] = label.split('~');
        const priceFrom = formatPrice(from, currency_code);
        const priceTo = formatPrice(to, currency_code);

        if (from === '*') {
            return __('Up to %s', priceTo);
        }

        if (to === '*') {
            return __('From %s', priceFrom);
        }

        return __('From %s, to %s', priceFrom, priceTo);
    }

    renderPriceSwatch(option) {
        const { attribute_options, ...priceOption } = option;

        if (attribute_options) {
            // do not render price filter if it includes "*_*" aggregation
            if (attribute_options['*_*']) {
                return null;
            }

            priceOption.attribute_options = Object.entries(attribute_options).reduce((acc, [key, option]) => {
                acc[key] = {
                    ...option,
                    label: this.getPriceLabel(option)
                };

                return acc;
            }, {});
        }

        return this.renderDropdownOrSwatch(priceOption);
    }

    renderDropdownOrSwatch(option) {
        const {
            isContentExpanded,
            getSubHeading
        } = this.props;

        const {
            attribute_label,
            attribute_code,
            attribute_options
        } = option;

        const [{ swatch_data }] = attribute_options ? Object.values(attribute_options) : [{}];
        const isSwatch = !!swatch_data;

        return (
            <ExpandableContent
              key={ attribute_code }
              heading={ attribute_label }
              subHeading={ getSubHeading(option) }
              mix={ {
                  block: 'ProductConfigurableAttributes',
                  elem: 'Expandable'
              } }
              isContentExpanded={ isContentExpanded }
            >
                { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-conditional */ }
                { isSwatch ? this.renderSwatch(option) : this.renderDropdown(option) }
            </ExpandableContent>
        );
    }

    renderConfigurableAttributeValue(attribute) {
        const {
            getIsConfigurableAttributeAvailable,
            handleOptionClick,
            getLink,
            isSelected,
            show_product_count
        } = this.props;

        const { attribute_value } = attribute;

        return (
            <ProductAttributeValue
              key={ attribute_value }
              attribute={ attribute }
              isSelected={ isSelected(attribute) }
              isAvailable={ getIsConfigurableAttributeAvailable(attribute) }
              onClick={ handleOptionClick }
              getLink={ getLink }
              isProductCountVisible={ show_product_count }
            />
        );
    }

    renderConfigurableOption = (option) => {
        const { attribute_code } = option;

        switch (attribute_code) {
        case 'price':
            return this.renderPriceSwatch(option);
        case 'category_id':
            return this.renderSubCategories(option);
        default:
            return this.renderDropdownOrSwatch(option);
        }
    };

    renderConfigurableAttributes() {
        const { configurable_options } = this.props;

        return sortBySortOrder(Object.values(configurable_options), 'attribute_position')
            .map(this.renderConfigurableOption);
    }

    renderDropdown(option) {
        const { attribute_values } = option;

        return (
            <div
              block="ProductConfigurableAttributes"
              elem="DropDownList"
            >
                { attribute_values.map((attribute_value) => (
                    this.renderConfigurableAttributeValue({ ...option, attribute_value })
                )) }
            </div>
        );
    }
}

export default CategoryConfigurableAttributesComponent;
