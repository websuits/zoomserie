import React from 'react';

// eslint-disable-next-line max-len
import TextPlaceholder from 'Component/TextPlaceholder';
// eslint-disable-next-line max-len
import { ExpandableContent as SrcExpandableContent } from 'SourceComponent/ExpandableContent/ExpandableContent.component';

import './ExpandableContent.style';
/** @namespace Zoomserie500/Component/ExpandableContent/Component/ExpandableContentComponent */
export class ExpandableContentComponent extends SrcExpandableContent {
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    __construct(props) {
        super.__construct(props);
        const { isContentExpanded } = this.props;
        this.state = {
            isContentExpanded,
            // eslint-disable-next-line react/no-unused-state
            prevIsContentExpanded: isContentExpanded,
            counter: 0
        };
    }

    toggleExpand = () => {
        const { onClick } = this.props;
        if (onClick) {
            onClick();
            return;
        }
        this.setState(
            ({ isContentExpanded }) => ({ isContentExpanded: !isContentExpanded })
        );
    };

    renderButton() {
        const { isContentExpanded } = this.state;
        const {
            heading,
            subHeading,
            mix
        } = this.props;

        return (
            <button
              block="ExpandableContent"
              elem="Button"
              mods={ { isContentExpanded } }
              mix={ { ...mix, elem: 'ExpandableContentButton' } }
              onClick={ this.toggleExpand }
            >
                <span
                  block="ExpandableContent"
                  elem="Heading"
                  mix={ { ...mix, elem: 'ExpandableContentHeading' } }
                >
                    { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-conditional */ }
                    { typeof heading === 'string' ? (
                        // eslint-disable-next-line react/jsx-no-undef
                        <TextPlaceholder content={ heading } length="medium" />
                    ) : (
                        heading
                    ) }
                </span>
                <span
                  block="ExpandableContent"
                  elem="SubHeading"
                  mix={ { ...mix, elem: 'ExpandableContentSubHeading' } }
                >
                    { subHeading }
                </span>
            </button>
        );
    }

    renderContent() {
        const { heading, children, mix } = this.props;
        const { isContentExpanded } = this.state;
        const mods = { isContentExpanded };

        return (
            <div
              block="ExpandableContent"
              elem="Content"
              mods={ mods }
              mix={ { ...mix, elem: 'ExpandableContentContent', mods } }
            >
                <button
                  block="modalSimulateClose"
                  elem="Button"
                  mods={ { isContentExpanded } }
                  onClick={ this.toggleExpand }
                >
                    X
                </button>
                <span
                  block="modalSimulate"
                  elem="Title"
                >
                    { heading }
                </span>
                { children }
            </div>
        );
    }

    incrementItem = () => {
        this.setState({
            counter: this.state.counter + 1
        });
    };

    render() {
        const { mix } = this.props;
        const { count } = this.incrementItem;

        return (
            <article
              block="ExpandableContent"
              mix={ mix }
              ref={ this.expandableContentRef }
            >
                { count }
                { this.renderButton() }
                { this.renderContent() }
            </article>
        );
    }
}
export default ExpandableContentComponent;
