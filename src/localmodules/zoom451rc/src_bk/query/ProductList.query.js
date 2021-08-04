/* eslint-disable max-lines */
import { ProductListQuery as SrcProductListQuery } from 'SourceQuery/ProductList.query';

/**
 * Slider Query
 * @class ProductList
 * @namespace Zoom451rc/Query/ProductList/Query/ProductListQuery */
export class ProductListQuery extends SrcProductListQuery {
    _getProductInterfaceFields(isVariant, isForLinkedProducts = false) {
        const {
            isSingleProduct,
            noAttributes = false,
            noVariants = false,
            noVariantAttributes = false
        } = this.options;

        const fields = [
            'id',
            'sku',
            'name',
            'type_id',
            'stock_status',
            'light_description',
            this._getPriceRangeField(),
            this._getProductImageField(),
            this._getProductThumbnailField(),
            this._getProductSmallField(),
            this._getShortDescriptionField(),
            'special_from_date',
            'special_to_date',
            this._getTierPricesField()
        ];

        // if it is normal product and we need attributes
        // or if, it is variant, but we need variant attributes or variants them-self
        if ((!isVariant && !noAttributes) || (isVariant && !noVariantAttributes && !noVariants)) {
            fields.push(this._getAttributesField(isVariant));
        }

        // to all products (non-variants)
        if (!isVariant) {
            fields.push(
                'url',
                this._getUrlRewritesFields(),
                this._getReviewCountField(),
                this._getRatingSummaryField()
            );

            // if variants are not needed
            if (!noVariants) {
                fields.push(
                    this._getConfigurableProductFragment(),
                    this._getBundleProductFragment()
                );
            }
        }

        // prevent linked products from looping
        if (isForLinkedProducts) {
            fields.push(this._getProductLinksField());
        }

        // additional information to PDP loads
        if (isSingleProduct) {
            fields.push(
                'stock_status',
                'meta_title',
                'meta_keyword',
                'canonical_url',
                'meta_description',
                this._getDescriptionField(),
                this._getMediaGalleryField(),
                this._getSimpleProductFragment(),
                this._getProductLinksField(),
                this._getCustomizableProductFragment()
            );

            // for variants of PDP requested product
            if (!isVariant) {
                fields.push(
                    this._getCategoriesField(),
                    this._getReviewsField(),
                    this._getVirtualProductFragment(),
                    this._getCustomizableProductFragment()
                );
            }
        }

        return fields;
    }
}

export default new ProductListQuery();
