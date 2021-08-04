import { App as SrcApp } from 'SourceComponent/App/App.component';

/** @namespace Zoomserie500/Component/App/Component/AppComponent */
export class AppComponent extends SrcApp {
    productionFunctions = [
        this.disableReactDevTools.bind(this)
    ];

    developmentFunctions = [
        this.enableHotReload.bind(false)
    ];
}

export default AppComponent;
