/* eslint-disable no-unused-expressions,react/destructuring-assignment */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { AttributeType } from 'Type/ProductList';

import ProductConfigurableAttributeDropdown from './ProductConfigurableAttributeDropdown.component';

/** @namespace Zoom451/Component/ProductConfigurableAttributeDropdown/Container/ProductConfigurableAttributeDropdownContainer */
export class ProductConfigurableAttributeDropdownContainer extends PureComponent {
    static propTypes = {
        option: AttributeType.isRequired,
        updateConfigurableVariant: PropTypes.func.isRequired,
        getIsConfigurableAttributeAvailable: PropTypes.func.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired
    };

    containerFunctions = {
        onChange: this.onChange.bind(this)
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component,consistent-return
    componentDidMount() {
        const {
            updateConfigurableVariant,
            option: {
                attribute_code
            }
        } = this.props;

        if (attribute_code === 'z20_unitate') {
            this.props.option.attribute_value = this.props.option.attribute_values[0];
            updateConfigurableVariant('z20_unitate', this.props.option.attribute_values[0]);
        }
    }

    // renderSwitch(param) {
    //     const {
    //         updateConfigurableVariant
    //     } = this.props;
    //
    //     console.log(param);
    //
    //     switch (param) {
    //     case 'z20_unitate':
    //         updateConfigurableVariant('z20_unitate', this.props.option.attribute_values[0]);
    //         break;
    //     case 'z40_forma':
    //         updateConfigurableVariant('z40_forma', this.props.option.attribute_values[0]);
    //         break;
    //     case 'z60_greutate':
    //         updateConfigurableVariant('z60_greutate', this.props.option.attribute_values[0]);
    //         break;
    //     default:
    //         updateConfigurableVariant(this.props.option.attribute_value, this.props.option.attribute_values[0]);
    //     }
    // }

    onChange(value) {
        const {
            updateConfigurableVariant,
            option: { attribute_code }
        } = this.props;

        updateConfigurableVariant(attribute_code, value);
    }

    containerProps = () => {
        const { option: { attribute_code, attribute_label } } = this.props;

        return {
            selectValue: this._getSelectValue(),
            selectOptions: this._getSelectOptions(),
            selectName: attribute_code,
            selectLabel: attribute_label
        };
    };

    _getSelectOptions = () => {
        const {
            option: {
                attribute_options,
                attribute_code
            },
            getIsConfigurableAttributeAvailable
        } = this.props;

        if (!attribute_options) {
            // eslint-disable-next-line no-console
            console.warn(`Please make sure "${ attribute_code }" is visible on Storefront.`);
            return [];
        }

        return Object.values(attribute_options)
            .reduce((acc, option) => {
                const { value } = option;

                const isAvailable = getIsConfigurableAttributeAvailable({
                    attribute_code,
                    attribute_value: value
                });

                if (!isAvailable) {
                    return acc;
                }

                return [...acc, {
                    ...option,
                    id: value
                }];
            }, []);
    };

    _getSelectValue = () => {
        const { option: { attribute_code } } = this.props;
        const { parameters = {} } = this.props;

        return parameters[attribute_code];
    };

    render() {
        return (
            <ProductConfigurableAttributeDropdown
              /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductConfigurableAttributeDropdownContainer;
