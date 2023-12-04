import { TOKEN } from "@/constant"
import { router } from "@/router"

const statusList: Indexable = {
  400: "请求参数错误!",
  401: "登录失效！请您重新登录",
  403: "当前账号无权限访问！",
  404: "你所访问的资源不存在！",
  405: "请求方式错误！请您稍后重试",
  408: "请求超时！请您稍后重试",
  429: "请求频繁！请休息片刻",
  500: "服务异常！",
  502: "网关错误！",
  503: "服务不可用！",
  504: "网关超时！",
}

export const Message = (message: string) => {
  window.$message.error(message)
}

export const checkStatus = (status: number, message?: string) => {
  const title = message ?? statusList[status] ?? "请求失败！"
  Message(title)
  if (status === 401) {
    localStorage.removeItem(TOKEN)
    router.push({ path: "/login" })
  }
}
