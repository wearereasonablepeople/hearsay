import React, {Component} from 'react';
import {connect} from 'react-redux';
import {subscribeFactory} from './';

export interface IWrapperProps {
  subscribe: () => any;
}

export const hearsay = WrappedComponent => {
  class Wrapper extends Component<IWrapperProps, any> {
    render() {
      const {subscribe} = this.props;
      return <WrappedComponent subscribe={subscribe}/>;
    }
  }
  Object.defineProperty(Wrapper, 'name', {value: WrappedComponent.name || WrappedComponent.displayName});
  return connect(null, dispatch => ({
    subscribe: subscribeFactory(dispatch),
  }))(Wrapper);
};
