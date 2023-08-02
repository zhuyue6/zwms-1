import { UserDatasApi } from './api'
import { get } from '@/services/http'
import {
  Page,
  newUserDataSnapshot,
  activeUserDataSnapshot,
  SearchParams,
} from './common'

interface NewUserDataResponse extends Page {
  rows: newUserDataSnapshot[]
}

export async function getUserData(params: SearchParams) {
  return get<NewUserDataResponse, SearchParams>(UserDatasApi.userData, params)
}

interface ActiveUserDataResponse extends Page {
  rows: activeUserDataSnapshot[]
}

export async function getActiveUserData(params: SearchParams) {
  return get<ActiveUserDataResponse, SearchParams>(
    UserDatasApi.activeUser,
    params
  )
}
