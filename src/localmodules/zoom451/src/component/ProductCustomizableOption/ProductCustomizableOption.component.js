// eslint-disable-next-line max-len
import ExpandableContent from 'Component/ExpandableContent';
// eslint-disable-next-line max-len
import { ProductCustomizableOption as SrcProductCustomizableOption } from 'SourceComponent/ProductCustomizableOption/ProductCustomizableOption.component';

import 'reactjs-popup/dist/index.css';

/** @namespace Zoom451/Component/ProductCustomizableOption/Component/ProductCustomizableOptionComponent */
export class ProductCustomizableOptionComponent extends SrcProductCustomizableOption {
    render() {
        const {
            option: {
                option_id
            },
            optionType
        } = this.props;

        const optionRenderMap = this.renderMap[optionType];

        if (!optionRenderMap) {
            return null;
        }

        const { render, title } = optionRenderMap;

        return (
            <ExpandableContent
              heading={ title() }
              mix={ { block: 'ProductCustomizableOptions', elem: 'Content' } }
              key={ option_id }
            >
                { render() }
            </ExpandableContent>
        );
    }
}

export default ProductCustomizableOptionComponent;
