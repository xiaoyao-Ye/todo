const toString = Object.prototype.toString

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function')
}

// 是否为域名
export function isDomain(val: string): boolean {
  return /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(val)
}

export function throttle(that: any, fn: Function, delay = 500) {
  let last = 0,
    timer: any = null
  return function (...args: any) {
    let context = that
    let now: number = Date.now()
    if (now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, delay)
    } else {
      // 时间到了必须给响应
      last = now
      fn.apply(context, args)
    }
  }
}
