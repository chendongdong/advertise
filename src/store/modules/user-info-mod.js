import request from '@/utils/request'
const userInfo = {
  state: {
    userInfo: {
      name: '蓝天白云'
    }
  },
  mutations: {
    SET_USER_INFO: (state, data) => {
      state.userInfo = data
    }

  },
  actions: {
    getUserInfo({ commit }) {
      request({
        url: '/user-info',
        method: 'get',
        params: {}
      }).then(res => {
        console.log('success res = ', res)
        commit('SET_USER_INFO', res.data)
      }).catch(err => {
        console.log('error = ', err)
      })
    }
  }
}

export default userInfo
