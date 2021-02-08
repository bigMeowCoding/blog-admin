import axios from "axios";
import servicePath from "../common/config/apiUrl";
import { Article } from "../interface/article";

export const getArticleList = () => {
  return axios.get<{ list: Article[] }>(servicePath.getArticleList, {
    withCredentials: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  });
};
