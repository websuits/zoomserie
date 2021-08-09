/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import { SET_CHECKOUT_FIELDS } from '@bss/checkout-fields/src/util/Event/Events'


const beforeSaveBillingAddress = async (args, callback, instance) => {

    console.log('beforeSaveBillingAddress')

    await window.dispatchEvent(new CustomEvent(SET_CHECKOUT_FIELDS));

    console.log('callback')

    return callback(...args)
};

export default {
    'Route/Checkout/Container':{
        'member-function': {
            saveBillingAddress: {
                position: 101,
                implementation: beforeSaveBillingAddress
            }
        }
    }
};