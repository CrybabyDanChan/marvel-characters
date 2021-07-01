import React, {FC, ReactElement} from 'react';
import {Provider} from 'react-redux';

import {store} from '../../store';
import {AppProps} from './types';

const App: FC<AppProps> = (props: AppProps): ReactElement => {
  return (
    <Provider store={store}>
        Hello!
    </Provider>
  );
};

export default App;
