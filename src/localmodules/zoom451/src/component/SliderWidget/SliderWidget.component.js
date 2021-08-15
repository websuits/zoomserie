/* eslint-disable no-restricted-globals */
import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';

import Html from 'Component/Html';
import Image from 'Component/Image';
import { SliderWidget as SrcSliderWidget } from 'SourceComponent/SliderWidget/SliderWidget.component';

/** @namespace Zoom451/Component/SliderWidget/Component/SliderWidgetComponent */
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
            arrows: true,
            cssEase: 'linear'
        };

        return (
            // eslint-disable-next-line react/jsx-no-comment-textnodes
            <>
                { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */ }
                <div
                  /* eslint-disable-next-line react/jsx-no-bind */
                  onClick={ () => this.slider.slickGoTo(0) }
                  className="SliderWidget-JumpFirst"
                >
                    { __('Jump to first slide') }
                </div>
                { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction,no-return-assign */ }
                <Slider ref={ (slider) => (this.slider = slider) } { ...settings }>
                    { slides.map(this.renderSlide) }
                </Slider>
            </>
        );
    }
}

export default SliderWidgetComponent;
