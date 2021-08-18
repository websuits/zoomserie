import React from 'react';

// import Slider from 'react-slick';
import { NewProducts as SrcNewProducts } from 'SourceComponent/NewProducts/NewProducts.component';
import ProductCard from 'SourceComponent/ProductCard';

/** @namespace Zoom451/Component/NewProducts/Component/NewProductsComponent */
export class NewProductsComponent extends SrcNewProducts {
    renderProductCard(product, i) {
        const {
            productCardProps,
            productCardFunctions
        } = this.props;

        return (
            <ProductCard
              key={ product.id || i }
              className={ productCardProps }
              product={ product }
                /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
              { ...productCardProps }
                /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
              { ...productCardFunctions }
            />
        );
    }

    render() {
        this.setStyles();
        // const settings = {
        //     slidesToShow: 3,
        //     slidesToScroll: 1,
        //     rows: 1,
        //     centerMode: false,
        //     infinite: false,
        //     arrows: true,
        //     responsive: [
        //         {
        //             breakpoint: 1024,
        //             settings: {
        //                 slidesToShow: 2
        //             }
        //         },
        //         {
        //             breakpoint: 521,
        //             settings: {
        //                 slidesToScroll: 1,
        //                 slidesToShow: 1.3
        //             }
        //         }
        //     ]
        // };

        const { products } = this.props;
        return (
            <section block="NewProducts" ref={ this.newProductsRef }>
                { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */ }
                { products.map(this.renderProductCard) }
            </section>
        );
    }
}

export default NewProductsComponent;
