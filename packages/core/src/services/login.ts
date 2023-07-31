import { post, get } from '@/shared/http'
import { UserApi } from '@/services/api'
import { useUserInfo } from '@/hooks'

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

const { setUserInfo } = useUserInfo()
export async function login(params: LoginParams) {
  const loginData = await post<LoginResponse>(UserApi.login, params, undefined, false, true)
  const userInfo = loginData
  setUserInfo(userInfo)
}

export async function loginOut() {
  await get<LoginResponse>(UserApi.logout, undefined, undefined, undefined, true)
  setUserInfo(null)
}
