import { get as dGet, post as dPost, useMiddleWare } from '@zwms/http'
import { ElMessage, ElLoading } from 'element-plus'
import router from '@/router'
import { appCode } from '@/services/api'
import { common } from '@/store'

const store = common.useCommonStore()

useMiddleWare({
  httpRequestMiddleWare(config) {
    const token = store.userInfo?.token
    const projectCode = store.userInfo?.projectCode
    const XToken = store.userInfo?.dwToken

    if (token) {
      config.headers['Authorization'] = token
    }
    config.headers['commonParam'] = projectCode
    config.headers['os'] = 'pc'
    config.headers['X-Token'] = XToken
    return config
  },
  httpResponseMiddleWare(response) {
    if (response.data?.code !== 0 && response.data?.errCode !== 0) {
      ElMessage({
        message: response.data.msg ?? response.data.errMsg,
        type: 'error',
      })
      if (
        [403, 404, 405, 8001, 703].includes(
          response.data?.code ?? (response.data?.errCode as number)
        )
      ) {
        router.push({
          path: '/login',
        })
      }
      return Promise.reject(response.data.msg ?? response.data.errMsg)
    }
    return response
  },
  httpResponseMiddleWareError(error) {
    if (error?.response?.headers['x-ca-error-code']) {
      // 阿里云认证失败
      ElMessage({
        message: '认证过期，请重新登录',
        type: 'error',
      })
      router.push({
        path: '/login',
      })
      return Promise.reject(error)
    }
    if (
      [403, 404, 405].includes(
        error?.response?.data?.code ?? error?.response?.data?.errCode
      )
    ) {
      ElMessage({
        message: error?.response?.data?.msg ?? error?.response?.data?.errMsg,
        type: 'error',
      })
      router.push({
        path: '/login',
      })
      return
    }
    ElMessage({
      message: '网络错误',
      type: 'error',
    })
    return Promise.reject(error)
  },
})

export async function get<T, P = any, D = any>(
  url: string,
  params?: P,
  data?: D,
  hasAppCode = true,
  isLoading = false
): Promise<T> {
  const mergeAppCodeParams: any = hasAppCode
    ? {
        ...params,
        appCode,
      }
    : params

  let loading: any
  if (isLoading) {
    const loadingService = ElLoading.service({
      fullscreen: true,
    })
    loading = () => loadingService.close()
  }
  return dGet(url, mergeAppCodeParams, data as any, loading)
}

export async function post<T, D = any, P = any>(
  url: string,
  data?: D,
  params?: P,
  hasAppCode = true,
  isLoading = false
): Promise<T> {
  const mergeAppCodeParams: any = hasAppCode
    ? {
        ...params,
        appCode,
      }
    : params

  let loading: any
  if (isLoading) {
    const loadingService = ElLoading.service({
      fullscreen: true,
    })
    loading = () => loadingService.close()
  }
  return dPost<T, D, P>(url, data as any, mergeAppCodeParams, loading)
}
