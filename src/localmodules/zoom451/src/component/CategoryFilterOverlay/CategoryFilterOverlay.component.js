/* eslint-disable max-lines,  max-len */
import PropTypes from 'prop-types';

import CategoryConfigurableAttributes from 'Component/CategoryConfigurableAttributes';
import Loader from 'Component/Loader';
import Overlay from 'Component/Overlay';
import ResetButton from 'Component/ResetButton';
import { CategoryFilterOverlay as SrcCategoryFilterOverlay } from 'SourceComponent/CategoryFilterOverlay/CategoryFilterOverlay.component';

import { CATEGORY_FILTER_OVERLAY_ID } from './CategoryFilterOverlay.config';

import './CategoryFilterOverlay.style';

/** @namespace Zoom451/Component/CategoryFilterOverlay/Component/CategoryFilterOverlayComponent */
export class CategoryFilterOverlayComponent extends SrcCategoryFilterOverlay {
    static propTypes = {
        availableFilters: PropTypes.objectOf(PropTypes.shape).isRequired,
        areFiltersEmpty: PropTypes.bool.isRequired,
        isContentFiltered: PropTypes.bool.isRequired,
        isMatchingInfoFilter: PropTypes.bool,
        isInfoLoading: PropTypes.bool.isRequired,
        isProductsLoading: PropTypes.bool.isRequired,
        onSeeResultsClick: PropTypes.func.isRequired,
        onVisible: PropTypes.func.isRequired,
        onHide: PropTypes.func.isRequired,
        customFiltersValues: PropTypes.objectOf(PropTypes.array).isRequired,
        toggleCustomFilter: PropTypes.func.isRequired,
        getFilterUrl: PropTypes.func.isRequired,
        totalPages: PropTypes.number.isRequired,
        isCategoryAnchor: PropTypes.bool
    };

    static defaultProps = {
        isCategoryAnchor: true,
        isMatchingInfoFilter: false
    };

    renderFilters() {
        const {
            availableFilters,
            customFiltersValues,
            toggleCustomFilter,
            isMatchingInfoFilter,
            getFilterUrl
        } = this.props;

        // eslint-disable-next-line no-unused-vars
        const { price, ...customFilters } = availableFilters;

        return (
            <CategoryConfigurableAttributes
              mix={ { block: 'CategoryFilterOverlay', elem: 'Attributes' } }
              isReady={ isMatchingInfoFilter }
              configurable_options={ customFilters }
              getLink={ getFilterUrl }
              parameters={ customFiltersValues }
              updateConfigurableVariant={ toggleCustomFilter }
            />
        );
    }

    renderSeeResults() {
        const { onSeeResultsClick } = this.props;

        return (
            <div
              block="CategoryFilterOverlay"
              elem="SeeResults"
            >
                <button
                  block="CategoryFilterOverlay"
                  elem="Button"
                  mix={ { block: 'Button' } }
                  onClick={ onSeeResultsClick }
                >
                    { __('SEE RESULTS') }
                </button>
            </div>
        );
    }

    renderResetButton() {
        const { onSeeResultsClick } = this.props;

        return (
            <ResetButton
              onClick={ onSeeResultsClick }
              mix={ { block: 'CategoryFilterOverlay', elem: 'ResetButton' } }
            />
        );
    }

    renderHeading() {
        return (
            <h3 block="CategoryFilterOverlay" elem="Heading">
                { __('Shopping Options') }
            </h3>
        );
    }

    renderNoResults() {
        return (
            <p block="CategoryFilterOverlay" elem="NoResults">
                { __(`The selected filter combination returned no results.
                Please try again, using a different set of filters.`) }
            </p>
        );
    }

    renderEmptyFilters() {
        return (
            <>
                { this.renderNoResults() }
                { this.renderResetButton() }
                { this.renderSeeResults() }
            </>
        );
    }

    renderMinimalFilters() {
        return this.renderSeeResults();
    }

    renderDefaultFilters() {
        return (
            <>
                { this.renderHeading() }
                { this.renderResetButton() }
                { this.renderFilters() }
                { this.renderSeeResults() }
            </>
        );
    }

    renderContent() {
        const {
            totalPages,
            areFiltersEmpty,
            isProductsLoading
        } = this.props;

        if (!isProductsLoading && totalPages === 0) {
            return this.renderEmptyFilters();
        }

        if (areFiltersEmpty) {
            return this.renderMinimalFilters();
        }

        return this.renderDefaultFilters();
    }

    renderLoader() {
        const {
            isInfoLoading,
            availableFilters
        } = this.props;

        const isLoaded = availableFilters && !!Object.keys(availableFilters).length;

        if (!isLoaded) { // hide loader if filters were not yet loaded (even once!)
            return null;
        }

        return (
            <Loader isLoading={ isInfoLoading } />
        );
    }

    render() {
        const {
            onVisible,
            onHide,
            totalPages,
            isProductsLoading,
            isContentFiltered,
            isCategoryAnchor,
            areFiltersEmpty
        } = this.props;

        if ((!isProductsLoading && totalPages === 0 && !isContentFiltered) || !isCategoryAnchor || areFiltersEmpty) {
            return (
                <div block="CategoryFilterOverlay">
                    { __('No filters for this category') }
                </div>
            );
        }

        return (
            <Overlay
              onVisible={ onVisible }
              onHide={ onHide }
              mix={ { block: 'CategoryFilterOverlay' } }
              id={ CATEGORY_FILTER_OVERLAY_ID }
              isRenderInPortal={ false }
            >
                <div>
                    { this.renderContent() }
                    { this.renderLoader() }
                </div>
            </Overlay>
        );
    }
}

export default CategoryFilterOverlayComponent;
