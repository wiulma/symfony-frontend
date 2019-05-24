import * as React from 'react';

declare module "react" {
    function lazy(p: any): any;
    function Suspense(): any
}

// jQuery
declare var $: any;

declare global {
    interface JQuery {
        bootstrapMaterialDesign(): JQuery;
        modal: (state: string) => {};
        collapse: (state: string) => {};
        connections: (config: {}) => {}
    }

    interface Document {
        documentMode?: any;
    }

    interface Window {
        StyleMedia?: any;
    }
}
