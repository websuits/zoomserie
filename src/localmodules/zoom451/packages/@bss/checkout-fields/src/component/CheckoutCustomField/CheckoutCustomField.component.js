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

import moment from 'moment';
 
 import './CheckoutCustomField.style';
 
 /** @namespace Component/CheckoutCustomField/Component */
 export class CheckoutCustomFieldComponent extends PureComponent {
    static propTypes = {
    }

    renderCompanyField() {
        const {company, setCompany, companyError}=this.props
        return (
            <>
            <Field
                id="company"
                type="text"
                label={ __('Company') }
                name="company"
                value={company}
                onChange={setCompany}
                validation={ ['notEmpty'] }
                validateSeparately
            />
            {companyError!=""&&
                <p block="Field" elem="Message">{companyError}</p>
            }
            </>
        );
    }

    renderOrderCommentField() {
        const {orderComment, setOrderComment, orderCommentError}=this.props
        return (
            <>
            <Field
                type={TEXTAREA_TYPE}
                label={ __('Order Comment') }
                id="order-comment"
                name="order_comment"
                validation={ ['notEmpty'] }
                value={orderComment}
                onChange={setOrderComment}
                validateSeparately
            />
            {orderCommentError!=""&&
                <p block="Field" elem="Message">{orderCommentError}</p>
            }
            </>
        );
    }

    renderOrderDateField() {
        const {setOrderDate, orderDate, minDate }=this.props
        return (
            <div block="DateFieldCol" mix={ { block: 'Field'} }>
                <label htmlFor="date" block="Field" elem="Label">{ __('Order Date') }</label>
                <Calendar
                    minDate={this.makeFormatDateForReactDateRange(minDate)}
                    date={this.makeFormatDateForReactDateRange(orderDate)}
                    onChange={setOrderDate}
                />
            </div>
        );
    }

    makeFormatDateForReactDateRange(data) {
        return new Date(moment(data))
    }

    renderOrderTimeField() {
        const {orderTimeOptions, selectedOrderTime, setOrdertime, selectedOrderTimeError}=this.props
        return (
            <>
            <Field
            id="order_time"
            name="order_time"
            type= { SELECT_TYPE }
            label= { __('Order Time') }
            validation={ ['notEmpty'] }
            mix={ { block: 'OrderTime', elem: 'Select' } }
            selectOptions={ orderTimeOptions }
            value={selectedOrderTime}
            onChange={setOrdertime}
            validateSeparately
            />
            {selectedOrderTimeError!=""&&
                <p block="Field" elem="Message">{selectedOrderTimeError}</p>
            }
            </>
        );
    }
    
    render() {
        return (
            <div block="Checkout" elem="CustomFields">
                <div block="FieldForm CheckoutAddressForm">
                    <div block="FieldForm-Fields">
                        { this.renderCompanyField() }
                        { this.renderOrderCommentField() }
                        { this.renderOrderDateField() }
                        { this.renderOrderTimeField() }
                    </div>
                </div>
            </div>
        );
    }
 }
 export default CheckoutCustomFieldComponent;
 