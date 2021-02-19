
const dynamic = (require("dva") as any).dynamic;

export const getNavData = (app: any) => [
  {
    path: "/",
    name: "",
    exact: true,
    redirect: true,
    to: "/login",
    children: [],
  },
  {
    path: "/login/",
    name: "",
    component: dynamic({
      app,
      component: () => import("./login/login"),
    }),
    children: [],
  },
  {
    path: "/index/",
    name: "",
    component: dynamic({
      app,
      component: () => import("./index"),
    }),
    children: [
      {
        path: "/index/add/",
        name: "",
        component: dynamic({
          app,
          component: () => import("./add-article/add-article"),
        }),
      },
      {
        path: "/index/list/",
        name: "",
        component: dynamic({
          app,
          models: () => [import("./article-list/models/article-list")],
          component: () => import("./article-list/articleList"),
        }),
      },
      {
        path: "/",
        name: "",
        redirect: true,
        to: "/index/list/",
      },
    ],
  },
];
