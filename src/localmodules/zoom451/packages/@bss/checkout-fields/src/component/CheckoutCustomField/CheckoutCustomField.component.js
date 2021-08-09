/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

 import { PureComponent } from 'react';
 import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

 import Field from "Component/Field";
 import {
    SELECT_TYPE,
    TEXTAREA_TYPE
} from 'Component/Field/Field.config';


 
 import './CheckoutCustomField.style';
 
 /** @namespace Component/CheckoutCustomField/Component */
 export class CheckoutCustomFieldComponent extends PureComponent {
    static propTypes = {
    }

    renderCompanyField() {
        const {company, setCompany}=this.props
        return (
            <Field
                type="text"
                label={ __('Company') }
                id="company"
                name="company"
                value={company}
                onChange={setCompany}
            />
        );
    }

    renderOrderCommentField() {
        const {orderComment, setOrderComment}=this.props
        return (
            <Field
                type={TEXTAREA_TYPE}
                label={ __('Order Comment') }
                id="order-comment"
                name="order_comment"
                value={orderComment}
                onChange={setOrderComment}
            />
        );
    }

    renderOrderDateField() {
        const {setOrderDate, orderDate}=this.props
        return (
            <div block="DateFieldCol" mix={ { block: 'Field'} }>
                <label htmlFor="date" block="Field" elem="Label">{ __('Order Date') }</label>
                <Calendar
                    minDate={new Date()}
                    date={orderDate}
                    onChange={setOrderDate}
                />
            </div>
        );
    }

    renderOrderTimeField() {
        const {orderTimeOptions, selectedOrderTime, updateOrdertime}=this.props
        return (
            <Field
            id="order_time"
            name="order_time"
            type= { SELECT_TYPE }
            label= { __('Order Time') }
            validation={ ['notEmpty'] }
            mix={ { block: 'OrderTime', elem: 'Select' } }
            selectOptions={ orderTimeOptions }
            value={selectedOrderTime}
            onChange={updateOrdertime}
            />
        );
    }
    
    render() {
        return (
            <div block="Checkout" elem="CustomFields">
                { this.renderCompanyField() }
                { this.renderOrderCommentField() }
                { this.renderOrderDateField() }
                { this.renderOrderTimeField() }
            </div>
        );
    }
 }
 export default CheckoutCustomFieldComponent;
 