import React, {FC, useState} from "react";

import { Layout, Menu, Breadcrumb } from "antd";
import "./index.scss";
import { useHistory} from "react-router-dom";
import { MenuInfo } from "rc-menu/es/interface";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminIndex: FC = ({children}) => {
  const history = useHistory();


  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (flag: boolean) => {
    setCollapsed(flag);
  };
// useEffect(()=> {
//   dispatch({
//     type: "articleList/getArticleList",
//   });
// },[])
  const handleClickArticle = (e: MenuInfo) => {
    if (e.key === "addArticle") {
      history.push("/index/add");
    } else {
      history.push("/index/list");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu
            key="sub1"
            title={
              <span>
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="addArticle" onClick={handleClickArticle}>
              添加文章
            </Menu.Item>
            <Menu.Item key="articleList" onClick={handleClickArticle}>
              文章列表
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <div>
              {children}
              {/*<Switch>*/}
              {/*  <Route path="/index/" exact component={AddArticle} />*/}
              {/*  <Route path="/index/add/" exact component={AddArticle} />*/}
              {/*  <Route path="/index/add/:id" exact component={AddArticle} />*/}
              {/*  <Route*/}
              {/*      path="/index/list/"*/}
              {/*      exact*/}
              {/*      component={dynamic({*/}
              {/*        app,*/}
              {/*        models: () => [import("../article-list/models/article-list")],*/}
              {/*        component: () => import("../article-list/articleList"),*/}
              {/*      })}*/}
              {/*  />*/}
              {/*</Switch>*/}

            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>bigmeow.com</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminIndex;
