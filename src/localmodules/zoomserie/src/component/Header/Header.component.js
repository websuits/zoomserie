import { CART_OVERLAY, CUSTOMER_WISHLIST } from '@scandipwa/scandipwa/src/component/Header/Header.config';
import PropTypes from 'prop-types';

import CurrencySwitcher from 'Component/CurrencySwitcher';
import OfflineNotice from 'Component/OfflineNotice';
import StoreSwitcher from 'Component/StoreSwitcher';
import { Header as SrcHeader } from 'SourceComponent/Header/Header.component';

import CmsBlock from '../../../scandipwa/src/component/CmsBlock/CmsBlock.container';
import Link from '../../../scandipwa/src/component/Link/Link.container';

/** @namespace Zoomserie/Component/Header/Component/HeaderComponent */
export class HeaderComponent extends SrcHeader {
    static propTypes = {
        currentStoreCode: PropTypes.string
    };

    renderMap = {
        cancel: this.renderCancelButton.bind(this),
        back: this.renderBackButton.bind(this),
        close: this.renderCloseButton.bind(this),
        share: this.renderShareWishListButton.bind(this),
        title: this.renderTitle.bind(this),
        logo: this.renderLogo.bind(this),
        search: this.renderSearchField.bind(this),
        account: this.renderAccount.bind(this),
        minicart: this.renderMinicart.bind(this),
        clear: this.renderClearButton.bind(this),
        edit: this.renderEditButton.bind(this),
        ok: this.renderOkButton.bind(this)
    };

    // eslint-disable-next-line consistent-return
    renderContacts() {
        return (
            <CmsBlock identifier="contacts_cms" />
        );
    }

    renderAlt() {
        const {
            logo_alt
        } = this.props;

        return (
            <div className="logoAlt">
                { logo_alt }
            </div>
        );
    }

    renderLogo(isVisible = false) {
        const { isLoading } = this.props;

        if (isLoading) {
            return null;
        }

        return (
            <Link
              to="/"
              aria-label="Go to homepage"
              aria-hidden={ !isVisible }
              tabIndex={ isVisible ? 0 : -1 }
              block="Header"
              elem="LogoWrapper"
              mods={ { isVisible } }
              key="logo"
            >
                { this.renderLogoImage() }
                { this.renderAlt() }
            </Link>
        );
    }

    renderAccountButton(isVisible) {
        const {
            onMyAccountButtonClick
        } = this.props;

        return (
            <button
              block="Header"
              elem="MyAccountWrapper"
              tabIndex="0"
              onClick={ onMyAccountButtonClick }
              aria-label="Open my account"
              id="myAccount"
            >
                <div
                  block="Header"
                  elem="Button"
                  mods={ { isVisible, type: 'account' } }
                />
            </button>
        );
    }

    renderMinicartButton() {
        const {
            onMinicartButtonClick
        } = this.props;

        return (
            <button
              block="Header"
              elem="MinicartButtonWrapper"
              tabIndex="0"
              onClick={ onMinicartButtonClick }
            >
                <span
                  aria-label="Minicart"
                  block="Header"
                  elem="MinicartIcon"
                />
                { this.renderMinicartItemsQty() }
            </button>
        );
    }

    renderTopMenu() {
        return (
            <div block="Header" elem="TopMenu">
                <div block="Header" elem="Contacts">
                    { this.renderContacts() }
                </div>
                <div block="Header" elem="Switcher">
                    <CurrencySwitcher />
                    <StoreSwitcher />
                </div>
            </div>
        );
    }

    render() {
        const { stateMap } = this;
        const {
            navigationState: { name, isHiddenOnMobile = false },
            isCheckout,
            device
        } = this.props;
        const { currentStoreCode } = this.props;

        if (!device.isMobile) {
            // hide edit button on desktop
            stateMap[CUSTOMER_WISHLIST].edit = false;
            stateMap[CUSTOMER_WISHLIST].share = false;
            stateMap[CART_OVERLAY].edit = false;
        }

        if (currentStoreCode === 'default') {
            return false;
        }

        return (
            <section block="Header" elem="Wrapper">
                <header
                  block="Header"
                  mods={ { name, isHiddenOnMobile, isCheckout } }
                  mix={ { block: 'FixedElement', elem: 'Top' } }
                  ref={ this.logoRef }
                >
                    { this.renderTopMenu() }
                    <nav block="Header" elem="Nav">
                        { this.renderNavigationState() }
                    </nav>
                    { this.renderMenu() }
                </header>
                <OfflineNotice />
            </section>
        );
    }
}

export default HeaderComponent;
