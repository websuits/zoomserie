/* eslint-disable no-restricted-globals */
import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';

import Html from 'Component/Html';
import Image from 'Component/Image';
import { SliderWidget as SrcSliderWidget } from 'SourceComponent/SliderWidget/SliderWidget.component';

/** @namespace Zoomseriev2/Component/SliderWidget/Component/SliderWidgetComponent */
export class SliderWidgetComponent extends SrcSliderWidget {
    static propTypes = {
        slider: PropTypes.shape({
            title: PropTypes.string,
            slideSpeed: PropTypes.number,
            slidesToDisplay: PropTypes.string,
            slidesToDisplayMobile: PropTypes.string,
            slidesToDisplayTablet: PropTypes.string,
            slides: PropTypes.arrayOf(
                PropTypes.shape({
                    desktop_image: PropTypes.string,
                    mobile_image: PropTypes.string,
                    slide_text: PropTypes.string,
                    isPlaceholder: PropTypes.bool,
                    slide_link: PropTypes.string
                })
            )
        })
    };

    static defaultProps = {
        slider: [{}]
    };

    state = {
        activeImage: 0,
        carouselDirection: 'right',
        display: true,
        width: 600
    };

    renderSlide = (slide, i) => {
        const {
            slide_text,
            slide_link,
            isPlaceholder,
            title: block
        } = slide;

        return (
            <figure
              block="SliderWidget"
              elem="Figure"
              key={ i }
            >
                <Image
                  mix={ { block: 'SliderWidget', elem: 'FigureImage' } }
                  ratio="custom"
                  src={ this.getSlideImage(slide) }
                  isPlaceholder={ isPlaceholder }
                />
                <a
                  block="SliderWidget"
                  mix={ { block } }
                  elem="Link"
                  href={ slide_link }
                >
                    <Html content={ slide_text || '' } />
                </a>
            </figure>
        );
    };

    checkRes = () => {
        const { slider: { slidesToDisplay, slidesToDisplayMobile, slidesToDisplayTablet } } = this.props;
        const { device } = this.props;

        if (device.isMobile) {
            return Number(slidesToDisplayMobile);
        }

        if (device.isTablet) {
            return Number(slidesToDisplayTablet);
        }

        return Number(slidesToDisplay);
    };

    render() {
        const { slider: { slides } } = this.props;

        const settings = {
            slidesToShow: this.checkRes(),
            slidesToScroll: 1,
            rows: 1,
            centerMode: false,
            infinite: false,
            arrows: true
        };

        return (
            // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
            <Slider { ...settings }>
                { slides.map(this.renderSlide) }
            </Slider>
        );
    }
}

export default SliderWidgetComponent;
