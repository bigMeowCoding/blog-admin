import React from "react";
import "antd/dist/antd.css";
import dva from "dva";
import { createBrowserHistory as createHistory } from 'history'
// @ts-ignore
import createLoading from 'dva-loading'
import RouterConfig from "./pages/main";

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

// ReactDOM.render(
//     <Main />
//  ,
//   document.getElementById("root")
// );
app.start('#root');
