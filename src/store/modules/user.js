import { login, get } from '@/api/user'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    AccessToken: localStorage.getItem('AccessToken'),
    ExpiresIn: localStorage.getItem('ExpiresIn'),
    RefreshToken: localStorage.getItem('RefreshToken'),
    UserId: localStorage.getItem('UserId'),
    NickName: '',
    AvatarUrl: ''
  }
}

const state = getDefaultState()

const mutations = {
  logout: (state) => {
    Object.assign(state, getDefaultState())
  },
  login: (state, data) => {
    Object.assign(state, getDefaultState())
  },
  get: (state, data) => {
    state.NickName = data.NickName
    state.AvatarUrl = data.AvatarUrl
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(username.trim(), password).then(response => {
        const { data } = response

        commit('login', data)

        localStorage.setItem('AccessToken', data.AccessToken)
        localStorage.setItem('ExpiresIn', data.ExpiresIn)
        localStorage.setItem('RefreshToken', data.RefreshToken)
        localStorage.setItem('UserId', data.UserId)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  get({ commit, state }) {
    return new Promise((resolve, reject) => {
      get(state.UserId).then(response => {
        const { data } = response

        if (!data) {
          return reject('未获取用户信息,请重新登录。')
        }

        commit('get', data)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      
      localStorage.removeItem('AccessToken')
      localStorage.removeItem('ExpiresIn')
      localStorage.removeItem('RefreshToken')
      localStorage.removeItem('UserId')

      resetRouter()
      commit('logout')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {      
      localStorage.removeItem('AccessToken')
      localStorage.removeItem('ExpiresIn')
      localStorage.removeItem('RefreshToken')
      localStorage.removeItem('UserId')

      commit('logout')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

