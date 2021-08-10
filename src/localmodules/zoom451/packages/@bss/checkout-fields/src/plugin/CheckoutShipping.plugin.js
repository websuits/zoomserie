/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import { SET_CHECKOUT_FIELDS, SET_CHECKOUT_FIELDS_VALIDATION } from '@bss/checkout-fields/src/util/Event/Events'
import CheckoutCustomField from '../component/CheckoutCustomField'


const onShippingSuccess = async (args, callback, instance) => {

    await window.dispatchEvent(new CustomEvent(SET_CHECKOUT_FIELDS));

    await window.addEventListener(SET_CHECKOUT_FIELDS_VALIDATION, function(event){
        if(event.detail) {
            return callback(...args)
        }
    });

    return
};

const renderAddressBook = (args, callback, instance) => {
    return (
        <>
            { callback.apply(instance, args) }
            <CheckoutCustomField />
        </>
    );
};

const onShippingError = (args, callback, instance) => {
    return callback(...arg);
};

export default {
    'Component/CheckoutShipping/Component':{
        'member-function': {
            renderAddressBook: {
                position: 100,
                implementation: renderAddressBook
            }
        }
    },
    'Component/CheckoutShipping/Container':{
        'member-function': {
            onShippingError: {
                position: 100,
                implementation: onShippingError
            }
        }
    },
    'Component/CheckoutShipping/Container':{
        'member-function': {
            onShippingSuccess: {
                position: 100,
                implementation: onShippingSuccess
            }
        }
    }

};