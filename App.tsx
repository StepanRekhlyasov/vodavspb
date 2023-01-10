import React from 'react';
import Navigator from './navigator'
import { Provider } from 'react-redux';
import store from './store/configureStore';

// YaMap.init(MAP_KEY);

export default function App() {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
}

