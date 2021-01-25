import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import marked from "marked";
import { Row, Col, Input, Select, Button, message, DatePicker } from "antd";
import "./add-article.scss";
import servicePath from "../../common/config/apiUrl";
import axios, { AxiosResponse } from "axios";
import { Article } from "../../interface/article";
import { fileToBase64 } from "../../common/utils/fileToBase64";
import { InsertReturn } from "../../interface/http";
import { useHistory, useRouteMatch } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

const AddArticle: FC = () => {
  // const { id } = useParams();
  let match = useRouteMatch<{ id: string }>("/index/add/:id");
  let params = match && match.params;
  const history = useHistory();
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(""); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(""); //发布日期
  const [selectedType, setSelectType] = useState(0); //选择的文章类别
  const [typeInfo, setTypeInfo] = useState<any[]>([]); // 文章类别信息

  //从中台得到文章类别信息
  const getTypeInfo = useCallback(() => {
    axios({
      method: "get",
      url: servicePath.getTypeInfo,
      headers: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    }).then((res) => {
      if (res.data.data === "没有登录") {
        localStorage.removeItem("openId");
        history.push("/");
      } else {
        setTypeInfo(res.data.data);
      }
    });
  }, [history]);

  useEffect(() => {
    getTypeInfo();
    //获得文章ID
    if (params && params.id) {
      const { id } = params,
        idNumber = parseInt(id, 10);
      setArticleId(idNumber);
      getArticleById(idNumber);
    }
  }, [params, getTypeInfo]);

  useEffect(() => {
    setSelectType(typeInfo[0] && typeInfo[0].id);
  }, [typeInfo]);

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  function changeArticleContent(content: string) {
    setArticleContent(content);
    let html = marked(content);
    setMarkdownContent(html);
  }

  const changeContent = (e: ChangeEvent | React.KeyboardEvent) => {
    changeArticleContent((e.target as HTMLInputElement).value);
  };

  const changeIntroduce = (e: any) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  //选择类别后的便哈
  const selectTypeHandler = (value: any) => {
    setSelectType(value);
  };

  const saveArticle = () => {
    if (!selectedType) {
      message.error("必须选择文章类别");
      return false;
    } else if (!articleTitle) {
      message.error("文章名称不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }

    let dataProps: Article = {
      id: 0,
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd,
      addTime: 0,
      view_count: 0,
    }; //传递到接口的参数

    let datetext = showDate.replace("-", "/"); //把字符串转换成时间戳
    dataProps.addTime = new Date(datetext).getTime() / 1000;

    if (articleId === 0) {
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000;
      axios({
        method: "post",
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isScuccess) {
          message.success("文章保存成功");
        } else {
          message.error("文章保存失败");
        }
      });
    } else {
      dataProps.id = articleId;
      axios({
        method: "post",
        url: servicePath.updateArticle,
        headers: { "Access-Control-Allow-Origin": "*" },
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isScuccess) {
          message.success("文章保存成功");
        } else {
          message.error("保存失败");
        }
      });
    }
  };
  const getArticleById = (id: number) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      //let articleInfo= res.data.data[0]
      setArticleTitle(res.data.data[0].title);
      setArticleContent(res.data.data[0].article_content);
      let html = marked(res.data.data[0].article_content);
      setMarkdownContent(html);
      setIntroducemd(res.data.data[0].introduce);
      let tmpInt = marked(res.data.data[0].introduce);
      setIntroducehtml(tmpInt);
      setShowDate(res.data.data[0].addTime);
      setSelectType(res.data.data[0].typeId);
    });
  };

  function addArticleImage(base64: string) {
    return axios
      .post<InsertReturn>(
        servicePath.addArticleImage,
        {
          content: base64,
          articleId,
        },
        {
          withCredentials: true,
        }
      )
      .then(
        (d: AxiosResponse<InsertReturn>) => {
          return d;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  const pasteChangeHandle: (e: React.ClipboardEvent) => void = async (e) => {
    if (e.clipboardData) {
      const files = e.clipboardData.files;
      if (files && files.length) {
        const file = files[0];
        const base64 = await fileToBase64(file);
        const addImageStatus = await addArticleImage(base64);
        if (addImageStatus) {
          const imageUrl = `![avatar](${servicePath.getArticleImage}/${addImageStatus.data.insertId})`;
          changeArticleContent(articleContent + imageUrl);
        }
      }
    }
  };

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={16}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
                size="large"
              />
            </Col>

            <Col span={4}>
              &nbsp;
              <Select
                value={selectedType}
                size="large"
                onChange={selectTypeHandler}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                onPaste={pasteChangeHandle}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              />
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
                placeholder="文章简介"
              />

              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{
                  __html: "文章简介：" + introducehtml,
                }}
              />
            </Col>

            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => setShowDate(dateString)}
                  placeholder="发布日期"
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddArticle;
