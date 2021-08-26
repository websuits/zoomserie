import CheckoutCustomFieldQuery from '@bss/checkout-fields/src/query/CheckoutCustomField.query';
import { SET_CHECKOUT_FIELDS, SET_CHECKOUT_FIELDS_VALIDATION } from '@bss/checkout-fields/src/util/Event/Events';
import moment from 'moment';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import Loader from 'Component/Loader';
import { showNotification } from 'Store/Notification/Notification.action';
import { isSignedIn } from 'Util/Auth';
import { getGuestQuoteId } from 'Util/Cart';
import { fetchMutation, fetchQuery } from 'Util/Request';

import CheckoutCustomField from './CheckoutCustomField.component';

/** @namespace Bss/CheckoutFields/Component/CheckoutCustomField/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
});

/** @namespace Bss/CheckoutFields/Component/CheckoutCustomField/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Bss/CheckoutFields/Component/CheckoutCustomField/Container/CheckoutCustomFieldContainer */
export class CheckoutCustomFieldContainer extends PureComponent {
    // eslint-disable-next-line react/sort-comp
    __construct(props) {
        super.__construct(props);
        this.state = {
            isLoading: true,
            company: '',
            orderComment: '',
            minDate: this.getTime(moment()),
            orderDate: this.getTime(moment()),
            orderTimeOptions: [],
            selectedOrderTime: -1,

            companyError: '',
            orderCommentError: '',
            selectedOrderTimeError: ''

        };
    }

    containerFunctions = {
        setOrdertime: this.setOrdertime.bind(this),
        setCompany: this.setCompany.bind(this),
        setOrderComment: this.setOrderComment.bind(this),
        setOrderDate: this.setOrderDate.bind(this)
    };

    async componentDidMount() {
        const that = this;
        await this.getAvailabelOrdertimeOptions();
        await this.selectDefaultOrdertimeOption();
        window.addEventListener(SET_CHECKOUT_FIELDS, (event) => {
            that.updateCustomCheckoutFields();
        });
    }

    setOrdertime(value) {
        this.setState({ selectedOrderTimeError: '' });
        if (parseInt(value) < 0) {
            this.setState({ selectedOrderTimeError: __('This field is required.') });
        }
        this.setState({ selectedOrderTime: parseInt(value) });
    }

    setCompany(value) {
        this.setState({ companyError: '' });
        if (value == '') {
            this.setState({ companyError: __('This field is required.') });
        }
        this.setState({ company: value });
    }

    setOrderComment(value) {
        this.setState({ orderCommentError: '' });
        if (value == '') {
            this.setState({ orderCommentError: __('This field is required.') });
        }
        this.setState({ orderComment: value });
    }

    async setOrderDate(value) {
        await this.setState({ orderDate: this.getTime(value) });
        await this.getAvailabelOrdertimeOptions();
        await this.selectDefaultOrdertimeOption();
    }

    optionsFormatOrdertime(options) {
        const array = [];
        options.forEach((option) => {
            array.push({
                id: parseInt(option.value),
                name: option.label,
                value: parseInt(option.value),
                label: option.label,
                is_dafault: option.is_default
            });
        });
        this.setState({ orderTimeOptions: array });
    }

    async getAvailabelOrdertimeOptions() {
        const { showNotification } = this.props;
        const { orderDate } = this.state;
        const that = this;
        this.setState({ isLoading: true });

        await fetchQuery(CheckoutCustomFieldQuery.getOrderTimeBssCheckoutCustomField(
            orderDate
        )).then(
            /** @namespace Bss/CheckoutFields/Component/CheckoutCustomField/Container/fetchQuery/then */
            (result) => {
                if (result.getOrderTimeBssCheckoutCustomField.length > 0) {
                    that.optionsFormatOrdertime(result.getOrderTimeBssCheckoutCustomField);
                    that.setState({ isLoading: false });
                } else {
                    that.setState({ orderTimeOptions: [], isLoading: false });
                }
            },
            /** @namespace Bss/CheckoutFields/Component/CheckoutCustomField/Container/fetchQuery/then */
            (error) => {
                that.setState({ orderTimeOptions: [], isLoading: false });
                showNotification('error', error[0].message);
            }
        );
    }

    async selectDefaultOrdertimeOption() {
        const that = this;
        const { orderTimeOptions } = this.state;
        if (orderTimeOptions.length > 0) {
            let isDefaultSet = false;
            orderTimeOptions.forEach((option) => {
                if (option.is_dafault) {
                    isDefaultSet = true;
                    that.setState({ selectedOrderTime: parseInt(option.value) });
                }
            });

            if (!isDefaultSet) {
                that.setState({ selectedOrderTime: parseInt(orderTimeOptions[0].value) });
            }
        } else {
            const { orderDate } = this.state;
            await this.setState({ orderDate: this.getTime(moment(orderDate, 'YYYY-MM-DD').add('days', 1)) });
            await this.setState({ minDate: this.getTime(moment(orderDate, 'YYYY-MM-DD').add('days', 1)) });
            await this.getAvailabelOrdertimeOptions();
            await this.selectDefaultOrdertimeOption();
        }
    }

    async updateCustomCheckoutFields() {
        // const validationResponse = this.checkValidation();
        const validationResponse = true;
        const { showNotification } = this.props;
        if (validationResponse) {
            this.setState({ isLoading: true });
            const {
                company,
                orderComment,
                orderDate,
                selectedOrderTime
            } = this.state;
            const params = {
                cart_id: !isSignedIn() && getGuestQuoteId(),
                company,
                order_date: moment(orderDate).format('MM/DD/YYYY'),
                order_time: selectedOrderTime,
                order_comment: orderComment
            };

            await fetchMutation(CheckoutCustomFieldQuery.updateCustomCheckoutFields(
                params
            )).then(
                /** @namespace Bss/CheckoutFields/Component/CheckoutCustomField/Container/fetchMutation/then */
                (result) => {
                    this.setState({ isLoading: false });
                },
                /** @namespace Bss/CheckoutFields/Component/CheckoutCustomField/Container/fetchMutation/then */
                (error) => {
                    showNotification('error', error[0].message);
                    this.setState({ isLoading: false });
                }
            );
        }

        await window.dispatchEvent(new CustomEvent(SET_CHECKOUT_FIELDS_VALIDATION, { detail: validationResponse }));
    }

    checkValidation() {
        let response = true;
        this.setState({ companyError: '', orderCommentError: '', selectedOrderTimeError: '' });
        const { company, orderComment, selectedOrderTime } = this.state;

        if (company == '') {
            response = false; this.setState({ companyError: __('This field is required.') });
        }
        if (orderComment == '') {
            response = false; this.setState({ orderCommentError: __('This field is required.') });
        }
        if (parseInt(selectedOrderTime) < 0) {
            response = false; this.setState({ selectedOrderTimeError: __('This field is required.') });
        }

        return response;
    }

    getTime(date, format = 'YYYYMMDD') {
        return moment(date).format(format);
    }

    render() {
        const { isLoading } = this.state;
        return (
            <>
                <Loader isLoading={ isLoading } />
                <CheckoutCustomField
                  /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
                  { ...this.props }
                  /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
                  { ...this.state }
                  { ...this.containerFunctions }
                />
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutCustomFieldContainer);
