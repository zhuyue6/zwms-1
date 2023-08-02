import { post, get } from '@/services/http'
import { UserApi } from '@/services/api'
import { common } from '@/store'

const store = common.useCommonStore()

interface LoginParams {
  password: string
  projectCode?: string
  userName: string
}

export interface UserInfo {
  adminType: number
  adminTypeId: number
  create_time: string
  isAdmin: boolean
  mobile: string
  navigationList: any[]
  realname: string
  projectCode: string
  regionCode: string
  token: string
  dwToken: string
  userId: number
  userName: string
}

type LoginResponse = UserInfo

export async function login(params: LoginParams) {
  const loginData = await post<LoginResponse>(
    UserApi.login,
    params,
    undefined,
    false,
    true
  )
  const userInfo = loginData
  store.setUserInfo(userInfo)
}

export async function loginOut() {
  await get<LoginResponse>(
    UserApi.logout,
    undefined,
    undefined,
    undefined,
    true
  )
  store.setUserInfo(null)
}
