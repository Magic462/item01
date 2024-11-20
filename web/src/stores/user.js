import { defineStore } from "pinia";

const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userID: localStorage.getItem('userID') || null
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
    setID(userID) {
      this.userID = userID
      localStorage.setItem('userID', userID)
    },
    clearID() {
      this.userID = null
      localStorage.removeItem('userID')
    }
  }
})


export default useUserStore