import { Button, Col, List, Row, Modal, message } from "antd";
import axios, { AxiosResponse } from "axios";
import React, { FC, useCallback, useEffect, useState } from "react";
import servicePath from "../../common/config/apiUrl";

import "./articleList.scss";
import { useHistory } from "react-router-dom";
import { Article } from "../../interface/article";

const { confirm } = Modal;

const ArticleList: FC = () => {
  const [list, setList] = useState<Article[]>([]);
  const history = useHistory();

  const setArticleList = useCallback(async () => {
    const res: AxiosResponse<{ list: Article[] }> = await getList();
    setList(res.data.list);
  }, []);

  useEffect(() => {
    setArticleList().catch((e) => {
      console.error(e);
    });
  }, [setArticleList]);

  //得到文章列表
  const getList = () => {
    return axios.get(servicePath.getArticleList, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  };

  //删除文章的方法
  const delArticle = (id: number) => {
    confirm({
      title: "确定要删除这篇博客文章吗?",
      content: "如果你点击OK按钮，文章将会永远被删除，无法恢复。",
      onOk() {
        axios(servicePath.delArticle + id, { withCredentials: true }).then(
          () => {
            message.success("文章删除成功");
            setArticleList().catch((e) => {
              console.error(e);
            });
          }
        );
      },
      onCancel() {
        message.success("没有任何改变");
      },
    });
  };

  //修改文章
  const updateArticle = (id: number) => {
    history.push("/index/add/" + id);
  };

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>集数</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>

            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item: any) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={3}>{item.typeName}</Col>
              <Col span={3}>{item.addTime}</Col>
              <Col span={3}>
                共<span>{item.part_count}</span>集
              </Col>
              <Col span={3}>{item.view_count}</Col>

              <Col span={4}>
                <Button
                  type="primary"
                  onClick={() => {
                    updateArticle(item.id);
                  }}
                >
                  修改
                </Button>
                &nbsp;
                <Button
                  onClick={() => {
                    delArticle(item.id);
                  }}
                >
                  删除{" "}
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ArticleList;
