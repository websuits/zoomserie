/* eslint-disable max-len */
import PropTypes from 'prop-types';

import Field from 'Component/Field';
import { ProductConfigurableAttributeDropdown as SrcProductConfigurableAttributeDropdown } from 'SourceComponent/ProductConfigurableAttributeDropdown/ProductConfigurableAttributeDropdown.component';

import './ProductConfigurableAttributeDropdown.style';

/** @namespace Zoom451/Component/ProductConfigurableAttributeDropdown/Component/ProductConfigurableAttributeDropdownComponent */
export class ProductConfigurableAttributeDropdownComponent extends SrcProductConfigurableAttributeDropdown {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        selectOptions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            id: PropTypes.string,
            value: PropTypes.string
        })).isRequired,
        selectValue: PropTypes.string,
        selectLabel: PropTypes.string,
        selectName: PropTypes.string.isRequired
    };

    static defaultProps = {
        selectValue: '',
        selectLabel: 'attribute'
    };

    render() {
        const {
            selectOptions,
            selectValue,
            selectName,
            selectLabel,
            onChange
        } = this.props;

        return (
            <Field
              id={ selectName }
              name={ selectName }
              type="select"
              placeholder={ __('Choose %s', selectLabel.toLowerCase()) }
              mix={ { block: 'ProductConfigurableAttributeDropdown' } }
              selectOptions={ selectOptions }
              value={ selectValue }
              onChange={ onChange }
            />
        );
    }
}

export default ProductConfigurableAttributeDropdownComponent;
