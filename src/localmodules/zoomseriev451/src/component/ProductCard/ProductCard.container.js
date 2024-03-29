/* eslint-disable max-lines */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Subscribe } from 'unstated';

import SharedTransitionContainer from 'Component/SharedTransition/SharedTransition.unstated';
import { DeviceType } from 'Type/Device';
import { FilterType, ProductType } from 'Type/ProductList';
import history from 'Util/History';
import { CONFIGURABLE, getVariantsIndexes } from 'Util/Product';
import { appendWithStoreCode, objectToUri } from 'Util/Url';

import ProductCard from './ProductCard.component';
import { IN_STOCK } from './ProductCard.config';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Zoomseriev451/Component/ProductCard/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device,
    base_link_url: state.ConfigReducer.base_link_url || '',
    product_use_categories: state.ConfigReducer.product_use_categories || false,
    category_url_suffix: state.ConfigReducer.category_url_suffix,
    isWishlistEnabled: state.ConfigReducer.wishlist_general_active
});

/** @namespace Zoomseriev451/Component/ProductCard/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    addProduct: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    )
});

/** @namespace Zoomseriev451/Component/ProductCard/Container/ProductCardContainer */
export class ProductCardContainer extends PureComponent {
    static propTypes = {
        product: ProductType,
        selectedFilters: FilterType,
        device: DeviceType.isRequired,
        // eslint-disable-next-line react/boolean-prop-naming
        product_use_categories: PropTypes.bool.isRequired,
        category_url_suffix: PropTypes.string.isRequired,
        base_link_url: PropTypes.string.isRequired,
        isWishlistEnabled: PropTypes.bool.isRequired,
        isPreview: PropTypes.bool
    };

    static defaultProps = {
        product: {},
        selectedFilters: {},
        isPreview: false
    };

    containerFunctions = {
        measurement: this._getMeasurement(),
        getAttribute: this.getAttribute.bind(this),
        isConfigurableProductOutOfStock: this.isConfigurableProductOutOfStock.bind(this),
        isBundleProductOutOfStock: this.isConfigurableProductOutOfStock.bind(this)
    };

    getAttribute(code) {
        const { selectedFilters } = this.props;

        if (!Object.keys(selectedFilters).length) {
            const { product: { attributes = {} } } = this.props;
            return attributes[code];
        }

        const currentVariantIndex = this._getCurrentVariantIndex();
        const { product, product: { variants = [] } } = this.props;
        const { attributes: parentAttributes = {} } = product;
        const { attributes = parentAttributes } = variants[currentVariantIndex] || product;
        const { attribute_options = {} } = parentAttributes[code] || {};

        return {
            ...attributes[code],
            attribute_options
        };
    }

    containerProps = () => ({
        availableVisualOptions: this._getAvailableVisualOptions(),
        currentVariantIndex: this._getCurrentVariantIndex(),
        productOrVariant: this._getProductOrVariant(),
        thumbnail: this._getThumbnail(),
        linkTo: this._getLinkTo()
    });

    _getLinkTo() {
        const {
            base_link_url,
            product_use_categories,
            category_url_suffix,
            product: { url, url_rewrites = [] },
            product
        } = this.props;
        const { pathname: storePrefix } = new URL(base_link_url || window.location.origin);
        const { location: { pathname } } = history;

        if (!url) {
            return undefined;
        }

        const { parameters } = this._getConfigurableParameters();
        const { state: { category = null } = {} } = history.location;
        const categoryUrlPart = pathname.replace(storePrefix, '').replace(category_url_suffix, '');
        const productUrl = `${categoryUrlPart}/${url.replace(storePrefix, '')}`;

        // if 'Product Use Categories' is enabled then use the current window location to see if the product
        // has any url_rewrite for that path. (if not then just use the default url)
        const rewriteUrl = url_rewrites.find(({ url }) => url.includes(productUrl)) || {};
        const rewriteUrlPath = product_use_categories
            ? (rewriteUrl.url && appendWithStoreCode(rewriteUrl.url)) || url
            : url;

        return {
            pathname: rewriteUrlPath,
            state: { product, prevCategoryId: category },
            search: objectToUri(parameters)
        };
    }

    _getCurrentVariantIndex() {
        const { index } = this._getConfigurableParameters();
        return index;
    }

    _getConfigurableParameters() {
        const { product: { variants = [] }, selectedFilters = {} } = this.props;
        const filterKeys = Object.keys(selectedFilters);

        if (filterKeys.length === 0) {
            return { indexes: [], parameters: {} };
        }

        const indexes = getVariantsIndexes(variants, selectedFilters, true);
        const [index] = indexes;

        if (!variants[index]) {
            return { indexes: [], parameters: {} };
        }
        const { attributes } = variants[index];

        const parameters = Object.entries(attributes)
            .reduce((parameters, [key, { attribute_value }]) => {
                if (filterKeys.includes(key)) {
                    return { ...parameters, [key]: attribute_value };
                }

                return parameters;
            }, {});

        return { indexes, index, parameters };
    }

    _isThumbnailAvailable(path) {
        return path && path !== 'no_selection';
    }

    _getThumbnail() {
        const product = this._getProductOrVariant();
        const { small_image: { url } = {} } = product;
        if (this._isThumbnailAvailable(url)) {
            return url;
        }

        // If thumbnail is, missing we try to get image from parent
        const { product: { small_image: { url: parentUrl } = {} } } = this.props;
        if (this._isThumbnailAvailable(parentUrl)) {
            return parentUrl;
        }

        return '';
    }

    _getProductOrVariant() {
        const { product: { type_id, variants }, product } = this.props;

        if (type_id === CONFIGURABLE && variants?.length) {
            return variants[this._getCurrentVariantIndex()] || product || {};
        }

        return product || {};
    }

    _getAvailableVisualOptions() {
        const { product: { configurable_options = {} } } = this.props;

        if (Object.keys(configurable_options).length === 0) {
            return [];
        }

        // Find first option that has swatch_data in attribute_options property
        const optionWithSwatchData = Object.values(configurable_options).find((option) => {
            const { attribute_options = {} } = option;

            return Object.values(attribute_options).some(({ swatch_data }) => swatch_data);
        });

        const { attribute_options = {} } = optionWithSwatchData || {};

        return Object.values(attribute_options).reduce(
            (acc, option) => {
                const {
                    swatch_data,
                    label
                } = option;

                const { type, value } = swatch_data || {};

                if (type && value) {
                    acc.push({ value, label, type });
                }

                return acc;
            },
            []
        );
    }

    _getMeasurement() {
        const { product: { configurable_options = {} } } = this.props;

        const measurement = Object.values(configurable_options).find((option) => option.attribute_code === 'unitate');

        const { attribute_options = {} } = measurement || {};

        return Object.values(attribute_options).reduce(
            (acc, option) => {
                const {
                    swatch_data,
                    label
                } = option;

                const { type, value } = swatch_data || {};

                if (type && value) {
                    acc.push({ value, label, type });
                }

                return acc;
            },
            []
        );
    }

    isConfigurableProductOutOfStock() {
        const { product: { variants }, isPreview } = this.props;

        if (isPreview) {
            return true;
        }

        const variantsInStock = variants.filter((productVariant) => productVariant.stock_status === IN_STOCK);

        return variantsInStock.length === 0;
    }

    isBundleProductOutOfStock() {
        const { product: { items } } = this.props;

        if (items.length === 0) {
            return true;
        }

        const { options } = items[0];

        const optionsInStock = options.filter((option) => option.product.stock_status === IN_STOCK);

        return optionsInStock.length === 0;
    }

    render() {
        return (
            // eslint-disable-next-line max-lines
            <Subscribe to={ [SharedTransitionContainer] }>
                { ({ registerSharedElement }) => (
                    <ProductCard
                      /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
                      { ...{ ...this.props, registerSharedElement } }
                      { ...this.containerFunctions }
                      { ...this.containerProps() }
                    />
                ) }
            </Subscribe>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardContainer);
