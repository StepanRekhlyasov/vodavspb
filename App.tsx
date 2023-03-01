import React from 'react';
import Navigator from './navigator'
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// YaMap.init(MAP_KEY);

export default function App() {
    return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Provider store={store}>
				<Navigator />
			</Provider>
		</GestureHandlerRootView>
    );
}

