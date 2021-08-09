/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import CheckoutCustomField from '../component/CheckoutCustomField'

export class CheckoutAddressBookPlugin {

    afterRenderContent = (args, callback, instance) => {
        return (
            <>
                { callback.apply(instance, args) }
                <CheckoutCustomField
                    { ...this.props }
                />
            </>
        );
    };

}

export const { afterRenderContent } = new CheckoutAddressBookPlugin();

export default {
    'Component/CheckoutAddressBook/Component': {
        'member-function': {
            renderContent: {
                position: 101,
                implementation: afterRenderContent
            }
        }
    },
};