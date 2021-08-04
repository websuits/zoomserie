import React from 'react';
import { withRouter } from 'react-router';

import VideoPopup from 'Component/VideoPopup';
import { ProductGallery as SrcProductGallery } from 'SourceComponent/ProductGallery/ProductGallery.component';

import './ProductGallery.style';

/** @namespace Zoom451/Component/ProductGallery/Component/ProductGalleryComponent */
export class ProductGalleryComponent extends SrcProductGallery {
    render() {
        return (
            <div block="ProductGallery">
                { this.renderSlider() }
                { this.renderAdditionalPictures() }
                <VideoPopup />
            </div>
        );
    }
}

export default withRouter(ProductGalleryComponent);
