import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/register",
      meta: {
        title: "主页"
      },
      component: () => import("@/components/home"),
      children: [
        {
          path: "/login",
          name: "login",
          meta: {
            title: "登录"
          },
          component: () => import("@/components/login")
        },
        {
          path: "/register",
          name: "register",
          meta: {
            title: "注册"
          },
          component: () => import("@/components/register")
        },
        {
          path: "/downloads",
          name: "downloads",
          meta: {
            title: "下载"
          },
          component: () => import("@/components/downloads")
        },
        {
          path: "/index",
          name: "index",
          redirect: "/order",
          meta: {
            title: "管理中心"
          },
          component: () => import("@/components/manage/index"),
          children: [
            {
              path: "/order",
              name: "order",
              meta: {
                title: "订单列表"
              },
              component: () => import("@/components/manage/order/order")
            },
            {
              path: "/messages",
              name: "messages",
              meta: {
                title: "留言板"
              },
              component: () => import("@/components/manage/message/list")
            },
            {
              path: "/persionalInfo",
              name: "persionalInfo",
              meta: {
                title: "个人资料"
              },
              component: () => import("@/components/manage/persionalInfo")
            },
            {
              path: "/updatePwd",
              name: "updatePwd",
              meta: {
                title: "修改密码"
              },
              component: () => import("@/components/manage/updatePwd")
            }
          ]
        }
      ]
    }
  ]
});
