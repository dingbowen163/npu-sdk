import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/login",
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
          path: "/sendEmail",
          name: "sendEmail",
          meta: {
            title: "发送重置密码邮件"
          },
          component: () => import("@/components/sendEmail")
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
          path: "/resetPwd",
          name: "resetPwd",
          meta: {
            title: "重置密码"
          },
          component: () => import("@/components/resetPwd")
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
              path: "/messageList",
              name: "messageList",
              meta: {
                title: "留言板"
              },
              component: () => import("@/components/manage/message/list")
            },
            {
              path: "/messageDetail/:inquiry_id",
              name: "messageDetail",
              meta: {
                title: "留言板"
              },
              component: () => import("@/components/manage/message/detail")
            },
            {
              path: "/messageBoard",
              name: "messageBoard",
              meta: {
                title: "留言板"
              },
              component: () => import("@/components/manage/message/board")
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
