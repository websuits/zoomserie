import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';

import Footer from 'Component/Footer';
import InstallPrompt from 'Component/InstallPrompt';
import LogoComponent from 'Component/Logo/Logo.component';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.config';
import CmsPage from 'Route/CmsPage';
import { HomePageContainer as SrcHomePage } from 'SourceRoute/HomePage/HomePage.container';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { DeviceType } from 'Type/Device';

import './HomePage.style';

/** @namespace Zoomseriev2/Route/HomePage_Backup/HomePage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    pageIdentifiers: state.ConfigReducer.cms_home_page,
    currentStoreCode: state.ConfigReducer.code
});

/** @namespace Zoomseriev2/Route/HomePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    // eslint-disable-next-line no-undef
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

/** @namespace Zoomseriev2/Route/HomePage/Container/HomePageContainer */
export class HomePageContainer extends SrcHomePage {
    static propTypes = {
        changeHeaderState: PropTypes.func.isRequired,
        device: DeviceType.isRequired,
        isOpened: PropTypes.bool
    };

    static defaultProps = {
        isOpened: true
    };

    __construct(props) {
        super.__construct(props);
        const { isOpened } = this.props;
        this.state = { isOpened, paragraphs: 0 };
    }

    componentDidMount() {
        const { changeHeaderState } = this.props;

        changeHeaderState({
            // eslint-disable-next-line no-undef
            name: DEFAULT_STATE_NAME,
            isHiddenOnMobile: false
        });
    }

    render() {
        // const { currentStoreCode } = this.props;

        // eslint-disable-next-line @scandipwa/scandipwa-guidelines/no-jsx-variables
        const Level3ItemsBuc = (
            <div className="level3">
                <Accordion.Title href="https://google.ro">Aviației București</Accordion.Title>
                <Accordion.Title href="https://google.ro">Victoriei București</Accordion.Title>
                <Accordion.Title href="https://google.ro">Pantelimon București</Accordion.Title>
                <Accordion.Title href="https://google.ro">Plaza Romania București</Accordion.Title>
                <Accordion.Title href="https://google.ro">Sun Plaza București</Accordion.Title>
                <Accordion.Title href="https://google.ro">AFI Cotroceni București</Accordion.Title>
            </div>
        );

        // eslint-disable-next-line @scandipwa/scandipwa-guidelines/no-jsx-variables
        const Level3ItemsBv = (
            <div className="level3">
                <Accordion.Title href="https://google.ro">Coresi Brașov</Accordion.Title>
                <Accordion.Title href="https://google.ro">Centrul Vechi Brașov</Accordion.Title>
                <Accordion.Title href="https://google.ro">AFI Brașov</Accordion.Title>
            </div>
        );

        // eslint-disable-next-line @scandipwa/scandipwa-guidelines/no-jsx-variables
        const Level3ItemsCj = (
            <div className="level3">
                <Accordion.Title href="https://google.ro">Vivo! Cluj</Accordion.Title>
            </div>
        );

        // eslint-disable-next-line @scandipwa/scandipwa-guidelines/no-jsx-variables
        const Level3ItemsCt = (
            <div className="level3">
                <Accordion.Title href="https://google.ro">Tomis Constanța</Accordion.Title>
            </div>
        );

        const SubAccordionPanels = [
            {
                title: 'București',
                content: { content: Level3ItemsBuc }
            }, {
                title: 'Brașov',
                // eslint-disable-next-line new-cap
                content: { content: Level3ItemsBv }
            }, {
                title: 'Cluj',
                // eslint-disable-next-line new-cap
                content: { content: Level3ItemsCj }
            }, {
                title: 'Constanța',
                // eslint-disable-next-line new-cap
                content: { content: Level3ItemsCt }
            }
        ];

        // eslint-disable-next-line @scandipwa/scandipwa-guidelines/no-jsx-variables
        const SubAccordions = (
            <div className="level2">
                <Accordion.Accordion
                  className="no-padding"
                  panels={ SubAccordionPanels }
                />
            </div>
        );

        const AccordionPanels = [
            { title: 'România', content: { content: SubAccordions, key: 'sub-accordions' } }
        ];

        // eslint-disable-next-line no-unused-vars
        const AccordionExampleNested = () => (
            <div className="Home__CountrySelector">
                <LogoComponent />
                <div className="Home__CountrySelector--Wrapper">
                    <div className="Home__CountrySelector--Container">
                        <h1 className="Home__CountrySelector--Title">Alege magazinul preferat</h1>
                        { /* eslint-disable-next-line max-len */ }
                        <span className="Home__CountrySelector--Description">Alegerea magazinului se face în funcție de distanța până la locul livrării</span>
                    </div>
                    <div className="Home__CountrySelector--Nested">
                        <Accordion
                          defaultActiveIndex={ 0 }
                          panels={ AccordionPanels }
                        />
                    </div>
                </div>
            </div>
        );

        if (currentStoreCode === 'default') {
            return (
                <AccordionExampleNested />
            );
        }

        return (
            <div block="HomePage">
                { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */ }
                <CmsPage { ...this.props } />
            </div>
        );
    }
}

// eslint-disable-next-line no-undef
export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
