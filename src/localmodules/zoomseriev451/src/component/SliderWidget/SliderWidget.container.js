import SliderWidget from '@scandipwa/scandipwa/src/component/SliderWidget/SliderWidget.component';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SliderQuery from 'Query/Slider.query';
import {
    mapDispatchToProps,
    SliderWidgetContainer as SrcSliderWidgetContainer
} from 'SourceComponent/SliderWidget/SliderWidget.container';

/** @namespace Zoomseriev451/Component/SliderWidget/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Zoomseriev451/Component/SliderWidget/Container/SliderWidgetContainer */
export class SliderWidgetContainer extends SrcSliderWidgetContainer {
    static propTypes = {
        sliderId: PropTypes.number.isRequired,
        slide_link: PropTypes.string,
        showNotification: PropTypes.func.isRequired
    };

    state = {
        slider: {
            slideSpeed: 0,
            slidesToDisplay: 4,
            slidesToDisplayTablet: 2.5,
            slidesToDisplayMobile: 1.5,
            slides: [{
                image: '', slide_link: '', slide_text: '', isPlaceholder: true
            }]
        }
    };

    componentDidMount() {
        this.requestSlider();
    }

    componentDidUpdate(prevProps) {
        const { sliderId } = this.props;
        const { sliderId: pSliderId } = prevProps;

        if (sliderId !== pSliderId) {
            this.requestSlider();
        }
    }

    requestSlider() {
        const { sliderId, showNotification } = this.props;

        this.fetchData(
            [SliderQuery.getQuery({ sliderId })],
            ({ slider }) => this.setState({ slider }),
            (e) => showNotification('error', 'Error fetching Slider!', e)
        );
    }

    _getGalleryPictures() {
        const { gallery } = this.state;
        return gallery;
    }

    render() {
        return (
            <SliderWidget
               /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
              { ...this.props }
                /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
              { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderWidgetContainer);
