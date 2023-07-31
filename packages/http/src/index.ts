import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'

const http: AxiosInstance = axios.create({
  timeout: 60000,
})

http.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

interface ResponseData<T = any> {
  code?: number
  errCode?: number
  logUUID?: string
  data: T
  msg?: string
  errMsg?: string
}

function request<T, D, P>(mode: 'get' | 'post', url: string, data: D, params: P) {
  if (mode === 'get') {
    return http.get<ResponseData<T>>(url, {
      params,
      data,
    })
  } else if (mode === 'post') {
    return http.post<ResponseData<T>>(url, data, {
      params,
    })
  }
}

export function ResponseMiddleware<T, D=any, P=any>(mode: 'get' | 'post', url: string, data: D, params: P, cb?: ()=>void) {
  return new Promise<AxiosResponse<ResponseData<T>, any>>((resolve, reject)=> {
    (request<T, D, P>(mode, url, data, params) as Promise<AxiosResponse<ResponseData<T>, any>>).then((res)=>{
        resolve(res)
      }, (res)=>{
        reject(res)
      }).finally(()=>{
        if (typeof cb === 'function') {
          cb()
        }
      })
    }
  )
}

interface UseMiddleWareParams {
  httpRequestMiddleWare?: (config: any)=> any, 
  httpRequestMiddleWareError?: (error: AxiosError)=>any,
  httpResponseMiddleWare?: (response: AxiosResponse<ResponseData>)=> any,
  httpResponseMiddleWareError?: (error: AxiosError) => any
}

export function useMiddleWare(useMiddleWareParams: UseMiddleWareParams) {
  http.interceptors.request.use(
    (config: any) => {
      if(useMiddleWareParams?.httpRequestMiddleWare?.(config)){
        return useMiddleWareParams?.httpRequestMiddleWare?.(config)
      }
      return config
    },
    (error: AxiosError) => {
      if(useMiddleWareParams?.httpRequestMiddleWareError?.(error)){
        return useMiddleWareParams?.httpRequestMiddleWareError?.(error)
      }
      
      Promise.reject(error)
    }
  )

  http.interceptors.response.use(
    (response: AxiosResponse<ResponseData>) => {
      if(useMiddleWareParams?.httpResponseMiddleWare?.(response)){
        return useMiddleWareParams?.httpResponseMiddleWare?.(response)
      }
      return response
    },
    (error: AxiosError) => {
      if(useMiddleWareParams?.httpResponseMiddleWareError?.(error)){
        return useMiddleWareParams?.httpResponseMiddleWareError?.(error)
      }
      
      return Promise.reject(error)
    }
  )
}


export async function get<T, P=any, D=any>(
  url: string,
  params?: P,
  data?: D,
  cb?: ()=>void
): Promise<T> {
  const responseData = await ResponseMiddleware<T, D, P>('get', url, data as any, params as any, cb)
  return responseData?.data?.data
}

export async function post<T, D=any, P=any>(
  url: string,
  data?: D,
  params?: P,
  cb?: ()=>void
): Promise<T> {
  const responseData = await ResponseMiddleware<T, D, P>('post', url, data as any, params as any, cb)
  return responseData?.data?.data
}
