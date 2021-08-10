import { Field } from 'Util/Query';

export class CheckoutCustomFieldGraphqlQuery {
    
    getOrderTimeBssCheckoutCustomField(date) {
        return new Field('getOrderTimeBssCheckoutCustomField')
            .addArgument('date', 'String!', date)
            .addFieldList(this._getOrderTimeBssCheckoutCustomField());
    }

    _getOrderTimeBssCheckoutCustomField() {
        return [
            'label',
            'value',
            'is_default'
        ]
    }

    updateCustomCheckoutFields(params) {
        return new Field('updateCustomCheckoutFields')
            .addArgument('cart_id', 'String', params.cart_id)
            .addArgument('company', 'String!', params.company)
            .addArgument('order_date', 'String!', params.order_date)
            .addArgument('order_time', 'String!', params.order_time)
            .addArgument('order_comment', 'String!', params.order_comment)
            .addFieldList(this._CustomCheckoutFieldsResponse());
    }

    _CustomCheckoutFieldsResponse() {
        return [
            'status',
            'message'
        ]
    }
}

export default new (CheckoutCustomFieldGraphqlQuery)();
