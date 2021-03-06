export let ipUrl = "http://127.0.0.1:7002/admin/";

export default {
  getTypeInfo: ipUrl + "getTypeInfo", //  获得文章类别信息
  checkLogin: ipUrl + "checkLogin", //  检查用户名密码是否正确
  addArticle: ipUrl + "addArticle", //  添加文章
  addArticleImage: ipUrl + "addArticleImage",
  getArticleImage: ipUrl + "getArticleImage",
  updateArticle: ipUrl + "updateArticle", //  更新文章
  getArticleList: ipUrl + "getArticleList", //  文章列表
  delArticle: ipUrl + "delArticle/", //  删除文章
  getArticleById: ipUrl + "getArticleById/", //  根据ID获得文章详情
};
