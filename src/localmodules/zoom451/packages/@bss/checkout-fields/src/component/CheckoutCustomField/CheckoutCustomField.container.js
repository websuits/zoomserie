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
 import PropTypes from 'prop-types';
 import { PureComponent } from 'react';
 import { connect } from 'react-redux';
 import { fetchQuery, fetchMutation } from 'Util/Request';
 import { showNotification } from 'Store/Notification/Notification.action';

 import CheckoutCustomField from './CheckoutCustomField.component';
 import { SET_CHECKOUT_FIELDS } from '@bss/checkout-fields/src/util/Event/Events'
 import CheckoutCustomFieldQuery from '@bss/checkout-fields/src/query/CheckoutCustomField.query';
 import Loader from 'Component/Loader';
 import { isSignedIn } from 'Util/Auth';
 import { getGuestQuoteId } from 'Util/Cart';

/** @namespace Component/CheckoutCustomField/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
});

/** @namespace Component/CheckoutCustomField/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Component/CheckoutCustomField/Container */
export class CheckoutCustomFieldContainer extends PureComponent {

    __construct(props) {
        console.log('__construct')
        super.__construct(props);
        this.state ={
            isLoading: true,
            company: "",
            orderComment: "",
            orderDate: new Date(),
            orderTimeOptions: [],
            selectedOrderTime: ''
        }
    }

    containerFunctions = {
        setOrdertime: this.setOrdertime.bind(this),
        setCompany: this.setCompany.bind(this),
        setOrderComment: this.setOrderComment.bind(this),
        setOrderDate: this.setOrderDate.bind(this)
    }

    async componentDidMount() {
        let that = this
        console.log('componentDidMount')
        await this.getAvailabelOrdertimeOptions()
        await this.selectDefaultOrdertimeOption()
        window.addEventListener(SET_CHECKOUT_FIELDS, function(event){
            console.log('addEventListener')
            that.updateCustomCheckoutFields()
        });
    }

    setOrdertime(value) {
        this.setState({selectedOrderTime: parseInt(value)})
    }
    setCompany(value) {
        this.setState({company: value})
    }
    setOrderComment(value) {
        this.setState({orderComment: value})
    }
    setOrderDate(value) {
        console.log(value)
        this.setState({orderDate: value})
        this.getAvailabelOrdertimeOptions()
    }

    optionsFormatOrdertime(options) {
        let array = []
        options.forEach(function(option){
            array.push({
                id: parseInt(option.value_id),
                name: option.value,
                value: parseInt(option.value_id),
                label: option.value,
                is_dafault: option.is_default
            })
        })
        this.setState({orderTimeOptions:array})
    }

    async getAvailabelOrdertimeOptions(date) {
        
        console.log('getAvailabelOrdertimeOptions')
        const {showNotification}= this.props
        const {orderDate}= this.state
        let that = this
        this.setState({isLoading: true})

        console.log(orderDate)

        await fetchQuery(CheckoutCustomFieldQuery.getOrderTimeBssCheckoutCustomField(
            orderDate
        )).then(
            (result) => {
                console.log('result')
                console.log(result)
                if(result.getOrderTimeBssCheckoutCustomField.length > 0){
                    that.optionsFormatOrdertime(result.getOrderTimeBssCheckoutCustomField)
                    that.setState({isLoading: false})
                }else{
                    that.setState({orderTimeOptions: [], isLoading: false})
                }
                
            },
            (error) =>{
                that.setState({orderTimeOptions: [], isLoading: false})
                dispatch(showNotification('error', error[0].message))
            }
        );
    }

    selectDefaultOrdertimeOption() {
        let that = this
        const {orderTimeOptions} = this.state
        if(orderTimeOptions.length > 0){
            let isDefaultSet = false
            orderTimeOptions.forEach(function(option){
                if(option.is_dafault) {
                    isDefaultSet = true
                    that.setState({selectedOrderTime: option.value})
                }
            })

            if(!isDefaultSet) {
                that.setState({selectedOrderTime: orderTimeOptions[0].value})
            }
        }
    }

    async updateCustomCheckoutFields() {
        console.log('updateCustomCheckoutFields')
        this.setState({isLoading: true})
        const {
            company,
            orderComment,
            orderDate,
            selectedOrderTime
        }= this.state
        const params ={
            cart_id: !isSignedIn() && getGuestQuoteId(),
            company: company,
            order_date: orderDate,
            order_time: selectedOrderTime,
            order_comment: orderComment
        }
        console.log('params')
        await fetchMutation(CheckoutCustomFieldQuery.updateCustomCheckoutFields(
            params
        )).then(
            (result) => {
                this.setState({isLoading: false})
            },
            (error) =>{
                dispatch(showNotification('error', error[0].message))
                this.setState({isLoading: false})
            }
        )
    }

    

    render() {
        const {isLoading}=this.state
        console.log('render')
        console.log(this.state)
        return (
            <>
                <Loader isLoading={ isLoading } />
                <CheckoutCustomField
                { ...this.props }
                { ...this.state }
                { ...this.containerFunctions }
                />
            </>
        );
    }
}
 
 export default connect(mapStateToProps, mapDispatchToProps)(CheckoutCustomFieldContainer);
 