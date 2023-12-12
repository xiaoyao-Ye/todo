// import { ElLoading } from 'element-plus'
// const Message = useMessage()

// let loadingInstance: ReturnType<typeof ElLoading.service>
const loading = ref(false)

const startLoading = () => {
  // Message.loading("加载中...", { duration: 0 })
  loading.value = true
  // loadingInstance = ElLoading.service({
  //   fullscreen: true,
  //   lock: true,
  //   text: 'Loading...',
  //   background: 'rgba(0, 0, 0, 0.5)',
  //   // spinner: 'el-icon-loading',
  // })
  // uni.showLoading({ title: "加载中..." });
}

const endLoading = () => {
  loading.value = false
  // loadingInstance.close()
  // uni.hideLoading();
}

let needLoadingRequestCount = 0

const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) startLoading()
  needLoadingRequestCount++
}

// 那么 showFullScreenLoading() tryHideFullScreenLoading() 要做的事就是将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) endLoading()
}

export { showFullScreenLoading, tryHideFullScreenLoading, loading }
