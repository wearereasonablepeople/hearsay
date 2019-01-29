import React, {Component} from 'react';
import {v4} from 'uuid';
import propTypes from 'prop-types';
export {reducer} from './reducer';
export {hearsay} from './hoc';

export const storeListenerMiddleware = s => next => action => {
  const result = next(action);
  const {storeListeners} = s.getState();
  storeListeners.listeners
  .filter(x => x.trigger === action.type)
  .map(x => x.effect(action.payload));
  return result;
};

export const subscribeFactory = dispatch => (trigger, effect) => {
  const id = v4();
  dispatch({type: 'LISTENER_SUBSCRIBE', payload: {trigger, effect, id}});
  return () => dispatch({type: 'LISTENER_UNSUBSCRIBE', payload: id});
};

export const HearsayContext = React.createContext(null);
export class HearsayProvider extends Component {
  static propTypes = {
    store: propTypes.object,
  };

  render() {
    const {store} = this.props;
    return <HearsayContext.Provider value={subscribeFactory(store.dispatch)}/>;
  }
}
