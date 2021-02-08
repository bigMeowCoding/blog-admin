import { ArticleListState } from "../pages/article-list/models/article-list";

export interface EffectsCommandMap {
  put: <A extends AnyAction>(action: A) => any;
  call: Function;
  select: Function;
  take: Function;
  cancel: Function;
  [key: string]: any;
}
export interface AnyAction extends Action {
  [extraProps: string]: any;
}

export interface Action<T = any> {
  payload: T;
}

export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>;
};
export type Reducer<S = any, A extends Action = Action> = (
  state: S | undefined,
  action: A
) => S;

export interface State {
  articleList: ArticleListState;
}
