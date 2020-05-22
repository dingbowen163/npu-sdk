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
              component: () => import("@/components/manage/order")
            }
          ]
        }
      ]
    }
  ]
});
