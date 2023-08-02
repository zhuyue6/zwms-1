import { defineStore } from 'pinia'
import { type UserInfo } from '@/services/login'
import { util } from '@zwms/shared'

interface State {
  userInfo: UserInfo | null
}

export const useCommonStore = defineStore('common', {
  state: (): State => ({
    userInfo: util.getStorage('userInfo'),
  }),
  actions: {
    setUserInfo(userInfo: UserInfo | null) {
      util.setStorage('userInfo', userInfo)
      this.userInfo = userInfo
    },
  },
})
