import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { router } from "../router/index"
import { AxiosCanceler } from "./helper/axiosCancel"
import { Message, checkStatus } from "./helper/checkStatus"
import { showFullScreenLoading, tryHideFullScreenLoading } from "./helper/loading"
import { TOKEN } from "@/constant"

const axiosCanceler = new AxiosCanceler()
const config: any = {
  // 默认地址
  // baseURL: 'http://yeyaoyao.icu',
  // baseURL: 'http://localhost:3000',
  // baseURL: 'http://127.0.0.1:3000',
  // baseURL: "http://192.168.1.2:3000",
  // baseURL: "http://120.79.135.213:1024",
  // 设置请求超时时间
  timeout: 10000,
  // 跨域的时候允许携带凭证
  withCredentials: true,
}

const isDev = import.meta.env.MODE === "development"
if (!isDev) {
  config.baseURL = "http://120.79.135.213:1024"
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
    const res = response.data
    // 在请求结束后，移除本次请求，并关闭请求 loading
    axiosCanceler.removePending(config)
    tryHideFullScreenLoading()
    // TODO:
    // 2xx以外的status都需要在error拦截里处理
    // 如果后端有自定义code(有些错误可能是http状态不包含的就需要通过自定义code处理了)，可以在这里进行处理
    if (res.code !== 200) {
      res.message ? Message(res.message) : checkStatus(res.code)
      return Promise.reject(res)
    }
    return res.data
  },
  (error: AxiosError) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    tryHideFullScreenLoading()
    const { response, message } = error

    if (message.includes("timeout")) Message("请求超时！请您稍后重试")
    if (message.includes("Network Error")) Message("网络异常,请检查您的网络连接是否正常")
    // 请求成功发出且服务器也响应了状态码
    // 根据响应的错误状态码, 做不同的处理
    if (response) checkStatus(response.status)
    if (!window.navigator.onLine) return router.replace({ path: "/500" })

    return Promise.reject(error)
  },
)

// 响应拦截直接返回了 data , 这里重新定义一下 request 的响应类型
export const request = <T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T> => {
  return service.request<any, T>(config)
}

// export default service
