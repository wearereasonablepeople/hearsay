import {IUnregisteredListener, IListener, ListenerId, IStoreListenerState} from './domain';
import {IAction} from './domain/action';

const defState = {
  listeners: [],
};

const subscribe = (state: IStoreListenerState, listener: IUnregisteredListener) => ({
  ...state,
  listeners: [...state.listeners, listener],
});

const unsubscribe = (state: IStoreListenerState, id: ListenerId) => ({
  ...state,
  listeners: state.listeners.filter((x: IListener) => x.id !== id),
});

const actionsMap = {
  LISTENER_SUBSCRIBE: subscribe,
  LISTENER_UNSUBSCRIBE: unsubscribe,
};

const actions = Object.keys(actionsMap);

export const reducer = (state = defState, action: IAction) =>
  actions.includes(action.type)
    ? actionsMap[action.type](state, action.payload)
    : state;
