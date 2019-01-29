const defState = {
  listeners: [],
};

const subscribe = (state, listener) => ({
  ...state,
  listeners: [...state.listeners, listener],
});

const unsubscribe = (state, id) => ({
  ...state,
  listeners: state.listeners.filter(x => x.id !== id),
});

const actionsMap = {
  LISTENER_SUBSCRIBE: subscribe,
  LISTENER_UNSUBSCRIBE: unsubscribe,
};

const actions = Object.keys(actionsMap);

export const reducer = (state = defState, action) =>
  actions.includes(action.type)
    ? actionsMap[action.type](state, action.payload)
    : state;
