/* eslint-disable react/jsx-no-bind,@scandipwa/scandipwa-guidelines/jsx-no-props-destruction,max-len */
import { SWITCH_ITEMS_TYPE } from '@scandipwa/scandipwa/src/component/Router/Router.config';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

import UrlRewrites from 'Route/UrlRewrites';
import { Router as SrcRouter } from 'SourceComponent/Router/Router.component';

export const CartPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cart" */ 'Route/CartPage'));
export const Checkout = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "checkout" */ 'Route/Checkout'));
export const CmsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/CmsPage'));
export const HomePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/HomePage'));
export const MyAccount = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "account" */ 'Route/MyAccount'));
export const PasswordChangePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Route/PasswordChangePage'));
export const SearchPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "category" */ 'Route/SearchPage'));
export const ConfirmAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/ConfirmAccountPage'));
export const MenuPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/MenuPage'));
export const WishlistShared = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Route/WishlistSharedPage'));
export const ContactPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "contact" */ 'Route/ContactPage'));
export const ProductComparePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Route/ProductComparePage'));
export const CreateAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Route/CreateAccount'));
export const LoginAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Route/LoginAccount'));
export const ForgotPasswordPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ 'Route/ForgotPassword'));

/** @namespace Zoom451/Component/Router/Component/withStoreRegex */
export const withStoreRegex = (path) => window.storeRegexText.concat(path);

/** @namespace Zoom451/Component/Router/Component/RouterComponent */
export class RouterComponent extends SrcRouter {
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/no-jsx-variables
    [SWITCH_ITEMS_TYPE] = [
        {
            component: <Route path={ withStoreRegex('/') } exact render={ (props) => <HomePage { ...props } /> } />,
            position: 10
        },
        {
            component: <Route path={ withStoreRegex('/search/:query/') } render={ (props) => <SearchPage { ...props } /> } />,
            position: 25
        },
        {
            component: <Route path={ withStoreRegex('/page') } render={ (props) => <CmsPage { ...props } /> } />,
            position: 40
        },
        {
            component: <Route path={ withStoreRegex('/cart') } exact render={ (props) => <CartPage { ...props } /> } />,
            position: 50
        },
        {
            component: <Route path={ withStoreRegex('/checkout/:step?') } render={ (props) => <Checkout { ...props } /> } />,
            position: 55
        },
        {
            component: <Route path={ withStoreRegex('/:account*/createPassword/') } render={ (props) => <PasswordChangePage { ...props } /> } />,
            position: 60
        },
        {
            component: <Route path={ withStoreRegex('/:account*/create/') } render={ (props) => <CreateAccountPage { ...props } /> } />,
            position: 61
        },
        {
            component: <Route path={ withStoreRegex('/:account*/login/') } render={ (props) => <LoginAccountPage { ...props } /> } />,
            position: 62
        },
        {
            component: <Route path={ withStoreRegex('/:account*/forgotpassword/') } render={ (props) => <ForgotPasswordPage { ...props } /> } />,
            position: 63
        },
        {
            component: <Route path={ withStoreRegex('/:account*/confirm') } render={ (props) => <ConfirmAccountPage { ...props } /> } />,
            position: 65
        },
        {
            component: <Route path={ withStoreRegex('/my-account/:tab?') } render={ (props) => <MyAccount { ...props } /> } />,
            position: 70
        },
        {
            component: <Route path={ withStoreRegex('/forgot-password') } render={ (props) => <MyAccount { ...props } /> } />,
            position: 71
        },
        {
            component: <Route path={ withStoreRegex('/menu') } render={ (props) => <MenuPage { ...props } /> } />,
            position: 80
        },
        {
            component: <Route path={ withStoreRegex('/wishlist/shared/:code') } render={ (props) => <WishlistShared { ...props } /> } />,
            position: 81
        },
        {
            component: <Route path={ withStoreRegex('/comenzi-speciale') } render={ (props) => <ContactPage { ...props } /> } />,
            position: 82
        },
        {
            component: <Route path={ withStoreRegex('/compare') } render={ (props) => <ProductComparePage { ...props } /> } />,
            position: 83
        },
        {
            component: <Route render={ (props) => <UrlRewrites { ...props } /> } />,
            position: 1000
        }
    ];
}

export default RouterComponent;
