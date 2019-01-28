import {v4} from 'uuid';
export {reducer} from './reducer';

export const storeListenerMiddleware = s => next => action => {
  const result = next(action);
  const {storeListeners} = s.getState();
  storeListeners.listeners
    .filter(x => x.trigger === action.type)
    .map(x => x.effect(action.payload));
  return result;
};

export const subscribeFactory = store => (trigger, effect) => {
  const id = v4();
  store.dispatch({type: 'LISTENER_SUBSCRIBE', payload: {trigger, effect, id}});
  return () => store.dispatch({type: 'LISTENER_UNSUBSCRIBE', payload: id});
};
