export type ListenerId = string;

export interface IUnregisteredListener {
  trigger: string;
  effect: (...args: any[]) => any;
}

export interface IListener extends IUnregisteredListener {
  id: ListenerId;
}

export interface IStoreListenerState {
  listeners: IListener[];
}

export interface IStore {
  dispatch: () => any;
}

export interface IHearsayProviderProps {
  store: IStore;
}
