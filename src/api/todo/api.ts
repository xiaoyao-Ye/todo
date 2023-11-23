/* eslint-disable */
// 此文件由 initAPI(https://github.com/xiaoyao-Ye/initapi) 自动生成。请不要手动修改此文件！

import { request } from "../index"

import {
  SortBy,
  SortOrder,
  PageTodoVo,
  TodoEntity,
  CreateTodoDto,
  UpdateTodoDto,
  SendCodeDto,
  SignUpDto,
  SignInDto,
  SignInVo,
} from "./typings.d"

export class Common {
  static getHello() {
    return request<void>({
      url: `/api/v1`,
      method: "GET",
    })
  }
}

export class Todo {
  /** 查询待办-根据搜索条件查询待办列表 */
  static page(params?: {
    limit?: number
    page?: number
    today?: boolean
    important?: boolean
    completed?: boolean
    sortBy?: SortBy
    sortOrder?: SortOrder
  }) {
    return request<PageTodoVo>({
      url: `/api/v1/todo/page`,
      method: "GET",
      params,
    })
  }

  /** 获取所有待办 */
  static findAll() {
    return request<Array<TodoEntity>>({
      url: `/api/v1/todo`,
      method: "GET",
    })
  }

  /** 创建待办 */
  static create(data?: CreateTodoDto) {
    return request<void>({
      url: `/api/v1/todo`,
      method: "POST",
      data,
    })
  }

  /** 更新待办 */
  static update(path: { id: number }, data?: UpdateTodoDto) {
    return request<void>({
      url: `/api/v1/todo/${path.id}`,
      method: "PATCH",
      data,
    })
  }

  /** 待办详情-根据 id 查询待办详情 */
  static findOne(path: { id: number }) {
    return request<TodoEntity>({
      url: `/api/v1/todo/${path.id}`,
      method: "GET",
    })
  }

  /** 删除待办 */
  static remove(path: { id: number }) {
    return request<void>({
      url: `/api/v1/todo/${path.id}`,
      method: "DELETE",
    })
  }
}

export class Sign {
  /** 发送验证码 */
  static sendVerificationCode(data?: SendCodeDto) {
    return request<void>({
      url: `/api/v1/sign/sendVerificationCode`,
      method: "POST",
      data,
    })
  }

  /** 用户注册 */
  static signUp(data?: SignUpDto) {
    return request<void>({
      url: `/api/v1/sign/signUp`,
      method: "POST",
      data,
    })
  }

  /** 用户登录 */
  static signIn(data?: SignInDto) {
    return request<SignInVo>({
      url: `/api/v1/sign/signIn`,
      method: "POST",
      data,
    })
  }
}