import React from "react";
import "antd/dist/antd.css";
import dva from "dva";
import { createBrowserHistory as createHistory } from 'history'
import createLoading from 'dva-loading'
import RouterConfig from "./pages/main";
// import articleListModal from "./pages/article-list/models/article-list";
// 1. 创建dva实例
const app = dva({
    history: createHistory(),
    onError() {
        // window.kraken.dispatchEvent('kraken:error')
    }
})

// 2. 装载插件
app.use(createLoading())
app.router(RouterConfig)

// tslint:disable-next-line:no-var-requires
app.model(require(
    './pages/article-list/models/article-list'
).default);

// ReactDOM.render(
//     <Main />
//  ,
//   document.getElementById("root")
// );
app.start('#root');
