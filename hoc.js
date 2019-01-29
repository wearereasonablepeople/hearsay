import React, {Component} from 'react';
import {connect} from 'react-redux';
import {subscribeFactory} from './';

export const hearsay = WrappedComponent => {
  class Wrapper extends Component {
    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }
  Object.defineProperty(
    Wrapper,
    'name',
    {value: WrappedComponent.name || WrappedComponent.displayName}
  );
  return connect(null, dispatch => ({
    subscribe: subscribeFactory(dispatch),
  }))(Wrapper);
};
