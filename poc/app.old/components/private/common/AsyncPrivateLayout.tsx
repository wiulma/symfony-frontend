import * as Loadable from 'react-loadable';

import {LoadingComponent} from '../../loader/LoaderComponent';

export const AsyncPrivateLayout = Loadable({
    loader: () => import("./PrivateLayout"),
    loading: LoadingComponent
});