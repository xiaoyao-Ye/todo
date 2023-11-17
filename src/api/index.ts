import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { router } from "../router/index"
import { AxiosCanceler } from "./helper/axiosCancel"
import { checkStatus } from "./helper/checkStatus"
import { showFullScreenLoading, tryHideFullScreenLoading } from "./helper/loading"
import { TOKEN } from "@/constant"

const axiosCanceler = new AxiosCanceler()

const config = {
  // 默认地址
  // baseURL: 'http://yeyaoyao.icu',
  // baseURL: 'http://localhost:3000',
  // baseURL: 'http://127.0.0.1:3000',
  // baseURL: "http://192.168.1.2:3000",
  baseURL: "http://43.136.108.102:1024",
  // 设置请求超时时间
  timeout: 10000,
  // 跨域的时候允许携带凭证
  withCredentials: true,
}

const service = axios.create(config)

service.interceptors.request.use(
  // (config: AxiosRequestConfig) => {
  config => {
    showFullScreenLoading()
    // * 将当前请求添加到 pending 中
    axiosCanceler.addPending(config)
    // const getToken = () => uni.getStorageSync(TOKEN)
    const getToken = () => localStorage.getItem(TOKEN)
    config.headers.Authorization = `Bearer ${getToken()}`
    return config
    // return { ...config, headers: { Authorization: `Bearer ${getToken()}` } }
  },
  (error: AxiosError) => {
    tryHideFullScreenLoading()
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 2xx 范围内的状态码都会触发该函数。
    const { data, config, statusText } = response
    if (!data) return Promise.reject(new Error(statusText))
    // * 在请求结束后，移除本次请求，并关闭请求 loading
    axiosCanceler.removePending(config)
    tryHideFullScreenLoading()
    console.log("response", response)
    // TODO:
    // 2xx以外的status都需要在error拦截里处理
    // 如果后端有自定义code(有些错误可能是http状态不包含的就需要通过自定义code处理了)，可以在这里进行处理
    if (data.code === 401) {
      checkStatus(401)
      localStorage.removeItem(TOKEN)
      router.replace({ path: "/login" })
      return Promise.reject(data)
    }
    if (data.code !== 200) {
      checkStatus(data.code)
      return Promise.reject(data)
    }
    return data.data
  },
  (error: AxiosError) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    tryHideFullScreenLoading()
    const { response, request, message } = error
    if (response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      console.log(response.data)
      // console.log(response.status)
      // console.log(response.headers)
      // 根据响应的错误状态码, 做不同的处理
      // if (response) return checkStatus(response.status, message)
      return checkStatus(response.status, (response.data as any)?.message ?? message)
    } else if (request) {
      // 请求已经成功发起，但没有收到响应
      // 服务器结果都没有返回(可能服务器错误可能客户端断网), 断网处理: 可以跳转到断网页面
      if (!window.navigator.onLine) return router.replace({ path: "/500" })
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      console.log(request)
    } else {
      // 发送请求时出了点问题
      checkStatus(0, message)
    }

    return Promise.reject(error)
  },
)

// 响应拦截直接返回了 data , 这里重新定义一下 request 的响应类型
export const request = <T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T> => {
  return service.request<any, T>(config)
}

// export default service
