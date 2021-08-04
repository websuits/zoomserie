// eslint-disable-next-line max-len
import {
    AREA_FIELD,
    CHECKBOX,
    DROPDOWN, TEXT_FIELD
} from '@scandipwa/scandipwa/src/component/ProductCustomizableOption/ProductCustomizableOption.config';
import PropTypes from 'prop-types';

// import Popup from 'reactjs-popup';
import ExpandableContent from 'Component/ExpandableContent';
import Field from 'Component/Field';
// eslint-disable-next-line max-len
import { ProductCustomizableOption as SrcProductCustomizableOption } from 'SourceComponent/ProductCustomizableOption/ProductCustomizableOption.component';

import 'reactjs-popup/dist/index.css';

/** @namespace Zoomseriev451/Component/ProductCustomizableOption/Component/ProductCustomizableOptionComponent */
export class ProductCustomizableOptionComponent extends SrcProductCustomizableOption {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        option: PropTypes.object.isRequired,
        textValue: PropTypes.string.isRequired,
        getSelectedCheckboxValue: PropTypes.func.isRequired,
        renderOptionLabel: PropTypes.func.isRequired,
        updateTextFieldValue: PropTypes.func.isRequired,
        textFieldValid: PropTypes.bool,
        setDropdownValue: PropTypes.func.isRequired,
        selectedDropdownValue: PropTypes.number.isRequired,
        optionType: PropTypes.string.isRequired,
        getDropdownOptions: PropTypes.func.isRequired,
        requiredSelected: PropTypes.bool.isRequired
    };

    static defaultProps = {
        textFieldValid: null
    };

    renderMap = {
        [CHECKBOX]: {
            render: () => this.renderCheckboxValues(),
            title: () => this.renderTitle()
        },
        [DROPDOWN]: {
            render: () => this.renderDropdownValues(),
            title: () => this.renderTitle()
        },
        [TEXT_FIELD]: {
            render: () => this.renderTextField(),
            title: () => this.renderTextFieldTitle()
        },
        [AREA_FIELD]: {
            render: () => this.renderTextField(),
            title: () => this.renderTextFieldTitle()
        }
    };

    renderDropdownValues() {
        const { option: { required, data } } = this.props;

        return (
            <>
                { this.renderOptionDropdownValues(data) }
                { this.renderRequired(required) }
            </>
        );
    }

    renderTextField() {
        const {
            option: {
                required,
                data
            },
            updateTextFieldValue,
            textValue,
            optionType,
            textFieldValid
        } = this.props;

        const [{ max_characters = 0 }] = data;
        const fieldType = optionType === 'field' ? 'text' : 'textarea';

        return (
            <>
                <Field
                  id={ `customizable-options-${ optionType }` }
                  name={ `customizable-options-${ optionType }` }
                  type={ fieldType }
                  maxLength={ max_characters > 0 ? max_characters : null }
                  value={ textValue }
                  onChange={ updateTextFieldValue }
                  customValidationStatus={ textFieldValid }
                />
                { this.renderCustomPriceLabel() }
                { this.renderRequired(required) }
                { this.renderMaxCharacters(max_characters) }
            </>
        );
    }

    renderTextFieldTitle() {
        const {
            option: {
                title
            }
        } = this.props;

        return this.renderMainTitle(title);
    }

    renderHeading(mainTitle) {
        const { option: { data } } = this.props;

        return (
            <>
                <span
                  block="ProductCustomizableOptions"
                  elem="Heading"
                >
                    { `${ mainTitle }` }
                </span>
                <span
                  block="ProductCustomizableOptions"
                  elem="HeadingBold"
                >
                    { `+ ${ data[0].price } RON` }
                </span>
            </>
        );
    }

    renderMainTitle(mainTitle) {
        return (
            <span
              block="ProductCustomizableOptions"
              elem="Heading"
            >
              { `${ mainTitle }` }
            </span>
        );
    }

    renderPriceLabel(titleBold) {
        return (
            <span
              block="ProductCustomizableOptions"
              elem="HeadingBold"
            >
              { `+ ${ titleBold }` }
            </span>
        );
    }

    renderCustomPriceLabel() {
        const {
            option: {
                data
            }
        } = this.props;

        return (
            <span
              block="ProductCustomizableOptions"
              elem="HeadingBold_Inline"
            >
              { `+ ${ data[0].price } RON` }
            </span>
        );
    }

    renderOptionCheckboxValue = (item) => {
        const { getSelectedCheckboxValue, renderOptionLabel } = this.props;
        const {
            option_type_id,
            title,
            price,
            price_type
        } = item;

        const priceLabel = renderOptionLabel(price_type, price);

        return (
            <Field
              type="checkbox"
              label={ this.renderHeading(title, priceLabel) }
              key={ option_type_id }
              id={ `option-${ option_type_id }` }
              name={ `option-${ option_type_id }` }
              value={ option_type_id }
              onChange={ getSelectedCheckboxValue }
            />
        );
    };

    render() {
        const {
            option: {
                option_id
            },
            optionType
        } = this.props;

        const optionRenderMap = this.renderMap[optionType];

        if (!optionRenderMap) {
            return null;
        }

        const { render, title } = optionRenderMap;

        return (
            <ExpandableContent
              heading={ title() }
              mix={ { block: 'ProductCustomizableOptions', elem: 'Content' } }
              key={ option_id }
            >
                { render() }
            </ExpandableContent>
        );
    }
}

export default ProductCustomizableOptionComponent;
