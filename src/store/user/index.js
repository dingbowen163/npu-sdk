import { getSelfInfo } from "@/service/home";

export default {
  namespaced: true,
  state: {
    user_id: "",
    name: "",
    role: "", // 普通用户-0, 客服-１
  },
  mutations: {
    setUserId(state, nv) {
      state.user_id = nv;
    },
    setUserName(state, nv) {
      state.name = nv;
    },
    setUserRole(state, nv) {
      state.role = nv;
    }
  },
  actions: {
    async getUserData({ commit }) {
      try {
        let params = {
          userid: sessionStorage.getItem("user_id")
        };
        if (params.userid) {
          const [userInfo] = await Promise.all([getSelfInfo({ params })]);
          if (userInfo) {
            commit("setUserId", userInfo.user_id);
            commit("setUserName", userInfo.name);
            commit("setUserRole", userInfo.role);
          }
        }
        else{
          commit("setUserId", '');
          commit("setUserName", '');
          commit("setUserRole", '');
        }
      } finally {
      }
    }
  },
  getters: {
    getUsetId(state) {
      return state.user_id;
    },
    setUserName(state) {
      return state.name;
    },
    setUserRole(state) {
      return state.role;
    }
  }
};
