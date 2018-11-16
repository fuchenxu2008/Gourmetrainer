import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const middlewares = [
    createLogger()
]

export default function configureStore() {
    const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));
    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('./reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}