import { defineStore } from "pinia";

const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    islogin: (state) => !!state.token
  },

  actions: {

    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },

    clearToken() {
      this.token = null;
      localStorage.removeItem('token'); // 从 localStorage 中移除
    },
  }
})


export default useUserStore