import PropTypes from 'prop-types';

import CheckoutAddressBook from 'Component/CheckoutAddressBook';
import CheckoutDeliveryOptions from 'Component/CheckoutDeliveryOptions';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import { STORE_IN_PICK_UP_METHOD_CODE } from 'Component/StoreInPickUp/StoreInPickUp.config';
import { SHIPPING_STEP } from 'Route/Checkout/Checkout.config';
import { CheckoutShipping as SrcCheckoutShipping } from 'SourceComponent/CheckoutShipping/CheckoutShipping.component';
import { addressType } from 'Type/Account';
import { shippingMethodsType, shippingMethodType } from 'Type/Checkout';
import { TotalsType } from 'Type/MiniCart';
import { formatPrice } from 'Util/Price';

/** @namespace Zoom451/Component/CheckoutShipping/Component/CheckoutShippingComponent */
export class CheckoutShippingComponent extends SrcCheckoutShipping {
    static propTypes = {
        totals: TotalsType.isRequired,
        cartTotalSubPrice: PropTypes.number,
        onShippingSuccess: PropTypes.func.isRequired,
        onShippingError: PropTypes.func.isRequired,
        onShippingEstimationFieldsChange: PropTypes.func.isRequired,
        shippingMethods: shippingMethodsType.isRequired,
        onShippingMethodSelect: PropTypes.func.isRequired,
        selectedShippingMethod: shippingMethodType,
        onAddressSelect: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isSubmitted: PropTypes.bool,
        onStoreSelect: PropTypes.func.isRequired,
        estimateAddress: addressType.isRequired,
        selectedStoreAddress: addressType
    };

    static defaultProps = {
        selectedShippingMethod: null,
        isSubmitted: false,
        cartTotalSubPrice: null,
        selectedStoreAddress: {}
    };

    renderOrderTotalExlTax() {
        const {
            cartTotalSubPrice,
            totals: { quote_currency_code }
        } = this.props;

        if (!cartTotalSubPrice) {
            return null;
        }

        const orderTotalExlTax = formatPrice(cartTotalSubPrice, quote_currency_code);

        return (
            <span>
                { `${ __('Excl. tax:') } ${ orderTotalExlTax }` }
            </span>
        );
    }

    renderOrderTotal() {
        const {
            totals: {
                grand_total,
                quote_currency_code
            }
        } = this.props;

        const orderTotal = formatPrice(grand_total, quote_currency_code);

        return (
            <dl block="Checkout" elem="OrderTotal">
                <dt>
                    { __('Order total:') }
                </dt>
                <dt>
                    { orderTotal }
                    { this.renderOrderTotalExlTax() }
                </dt>
            </dl>
        );
    }

    renderActions() {
        const { selectedShippingMethod, selectedStoreAddress } = this.props;
        const { method_code } = selectedShippingMethod;
        const {
            totals
        } = this.props;

        // eslint-disable-next-line no-magic-numbers
        if (totals.subtotal < 80) {
            return (
                <>
                    <div block="Checkout" elem="StickyButtonWrapper">
                        { this.renderOrderTotal() }
                        <button
                          type="submit"
                          block="Button"
                          disabled
                          mix={ { block: 'CheckoutShipping', elem: 'Button' } }
                        >
                            { __('Proceed to billing') }
                        </button>
                    </div>
                    <p />
                    <strong
                      className="MinOrder-Message"
                    >
                        { __('Minimum order amount is 80 RON') }
                    </strong>
                </>
            );
        }

        return (
            <div block="Checkout" elem="StickyButtonWrapper">
                { this.renderOrderTotal() }
                <button
                  type="submit"
                  block="Button"
                  disabled={ !selectedShippingMethod
                      || (method_code === STORE_IN_PICK_UP_METHOD_CODE && !Object.keys(selectedStoreAddress).length) }
                  mix={ { block: 'CheckoutShipping', elem: 'Button' } }
                >
                    { __('Proceed to billing') }
                </button>
            </div>
        );
    }

    renderDelivery() {
        const {
            shippingMethods,
            onShippingMethodSelect,
            estimateAddress,
            onStoreSelect
        } = this.props;

        return (
            <CheckoutDeliveryOptions
              shippingMethods={ shippingMethods }
              onShippingMethodSelect={ onShippingMethodSelect }
              estimateAddress={ estimateAddress }
              onStoreSelect={ onStoreSelect }
            />
        );
    }

    renderAddressBook() {
        const {
            onAddressSelect,
            onShippingEstimationFieldsChange,
            isSubmitted
        } = this.props;

        return (
            <CheckoutAddressBook
              onAddressSelect={ onAddressSelect }
              onShippingEstimationFieldsChange={ onShippingEstimationFieldsChange }
              isSubmitted={ isSubmitted }
            />
        );
    }

    render() {
        const {
            onShippingSuccess,
            onShippingError,
            isLoading
        } = this.props;

        return (
            <Form
              id={ SHIPPING_STEP }
              mix={ { block: 'CheckoutShipping' } }
              onSubmitError={ onShippingError }
              onSubmitSuccess={ onShippingSuccess }
            >
                { this.renderAddressBook() }
                <div>
                    <Loader isLoading={ isLoading } />
                    { this.renderDelivery() }
                    { this.renderActions() }
                </div>
            </Form>
        );
    }
}

export default CheckoutShippingComponent;
