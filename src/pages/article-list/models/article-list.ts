import { getArticleList } from "../../../service/api.article";
import { Article } from "../../../interface/article";
import {
  Action,
  EffectsCommandMap,
  ReducersMapObject,
} from "../../../interface/dva";
export interface ArticleListState {
  list: Article[];
}
const articleList: {
  namespace: "articleList";
  state: ArticleListState;
  effects: {
    getArticleList: (action: {}, effects: EffectsCommandMap) => void;
  };
  reducers?: ReducersMapObject;
} = {
  namespace: "articleList",
  state: {
    list: [],
  },
  effects: {
    *getArticleList({}, { call, put }) {
      const response = yield call(getArticleList);
      const list = response.data.list;
      yield put({
        type: "updateArticleList",
        payload: list,
      });
      return {
        list,
      };
    },
  },
  reducers: {
    updateArticleList(state: ArticleListState, action: Action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default articleList;
