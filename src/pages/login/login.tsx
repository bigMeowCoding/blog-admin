import React, { FC, useState } from "react";
import { Button, Card, Input, Spin, message } from "antd";
import axios from "axios";
import "./login.scss";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import KeyOutlined from "@ant-design/icons/lib/icons/KeyOutlined";
import servicePath from "../../common/config/apiUrl";
import { useHistory } from "react-router-dom";

const Login: FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const checkLogin = () => {
    setIsLoading(true);

    if (!userName) {
      message.error("用户名不能为空");
      return false;
    } else if (!password) {
      message.error("密码不能为空");
      return false;
    }

    let dataProps = {
      userName: userName,
      password: password,
    };

    axios({
      method: "post",
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      setIsLoading(false);
      if (res.data.data === "登录成功") {
        localStorage.setItem("openId", res.data.openId);
        history.push("/index");
      } else {
        message.error("用户名密码错误");
      }
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card
          title="BigMeow Blog System"
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined />}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <br />

          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            Login in
          </Button>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
