import { Field } from 'Util/Query';

/**
 * Slider Query
 * @class Slider
 * @namespace Zoom451rc/Query/Slider/Query/SliderQuery */
export class SliderQuery {
    getQuery(options) {
        const { sliderId } = options;

        return new Field('scandiwebSlider')
            .addArgument('id', 'ID!', sliderId)
            .addFieldList(this._getSliderFields())
            .setAlias('slider');
    }

    _getSliderFields() {
        return [
            this._getSlidesField(),
            this._getSlideSpeedField(),
            this._getSlidesToDisplay(),
            this._getSlidesToDisplayTablet(),
            this._getSlidesToDisplayMobile(),
            'slider_id',
            'title'
        ];
    }

    _getSlideFields() {
        return [
            'slide_text',
            'slide_id',
            'mobile_image',
            'desktop_image',
            'slide_link',
            'title',
            'is_active'
        ];
    }

    _getSlidesField() {
        return new Field('slides')
            .addFieldList(this._getSlideFields());
    }

    _getSlideSpeedField() {
        return new Field('slide_speed').setAlias('slideSpeed');
    }

    _getSlidesToDisplay() {
        return new Field('slides_to_display').setAlias('slidesToDisplay');
    }

    _getSlidesToDisplayTablet() {
        return new Field('slides_to_display_tablet').setAlias('slidesToDisplayTablet');
    }

    _getSlidesToDisplayMobile() {
        return new Field('slides_to_display_mobile').setAlias('slidesToDisplayMobile');
    }
}

export default new SliderQuery();
