import * as Loadable from 'react-loadable';

import LoaderComponent from '../../loader/LoaderComponent';

export const AsyncPrivateLayout = Loadable({
    loader: () => import("./PrivateLayout"),
    loading: LoaderComponent
});