/* eslint-disable */
// 此文件由 initAPI(https://github.com/xiaoyao-Ye/initapi) 自动生成。请不要手动修改此文件！

import { request } from '../index'

import {
  SortByTodo,
  SortOrder,
  PageTodoVo,
  TodoEntity,
  CreateTodoDto,
  CountTodoVo,
  UpdateTodoDto,
  SendCodeDto,
  SignUpDto,
  SignInDto,
  SignInVo,
  TokenVo,
  ListEntity,
  CreateListDto,
  ListDto,
} from './typings.d'

export class Common {
  static getHello() {
    return request<void>({
      url: `/api/v1`,
      method: 'GET',
    })
  }
}

export class Todo {
  /** 查询待办-根据搜索条件查询待办列表 */
  static page(params?: {
    limit?: number
    page?: number
    list_id?: number
    today?: boolean
    important?: boolean
    completed?: boolean
    sortBy?: SortByTodo
    sortOrder?: SortOrder
  }) {
    return request<PageTodoVo>({
      url: `/api/v1/todo/page`,
      method: 'GET',
      params,
    })
  }

  /** 获取所有待办 */
  static findAll() {
    return request<Array<TodoEntity>>({
      url: `/api/v1/todo`,
      method: 'GET',
    })
  }

  /** 创建待办 */
  static create(data?: CreateTodoDto) {
    return request<TodoEntity>({
      url: `/api/v1/todo`,
      method: 'POST',
      data,
    })
  }

  /** 重新注册定时提醒 */
  static reRegisterTask() {
    return request<void>({
      url: `/api/v1/todo/reRegisterTask`,
      method: 'GET',
    })
  }

  /** 获取活跃度 */
  static countTodo(params?: { startDate?: string; endDate?: string }) {
    return request<Array<CountTodoVo>>({
      url: `/api/v1/todo/countTodo`,
      method: 'GET',
      params,
    })
  }

  /** 更新待办 */
  static update(path: { id: number }, data?: UpdateTodoDto) {
    return request<void>({
      url: `/api/v1/todo/${path.id}`,
      method: 'PATCH',
      data,
    })
  }

  /** 待办详情-根据 id 查询待办详情 */
  static findOne(path: { id: number }) {
    return request<TodoEntity>({
      url: `/api/v1/todo/${path.id}`,
      method: 'GET',
    })
  }

  /** 删除待办 */
  static remove(path: { id: number }) {
    return request<void>({
      url: `/api/v1/todo/${path.id}`,
      method: 'DELETE',
    })
  }
}

export class Sign {
  /** 发送验证码 */
  static sendVerificationCode(data?: SendCodeDto) {
    return request<void>({
      url: `/api/v1/sign/sendVerificationCode`,
      method: 'POST',
      data,
    })
  }

  /** 用户注册 */
  static signUp(data?: SignUpDto) {
    return request<void>({
      url: `/api/v1/sign/signUp`,
      method: 'POST',
      data,
    })
  }

  /** 用户登录 */
  static signIn(data?: SignInDto) {
    return request<SignInVo>({
      url: `/api/v1/sign/signIn`,
      method: 'POST',
      data,
    })
  }

  /** 刷新token */
  static refreshToken() {
    return request<TokenVo>({
      url: `/api/v1/sign/refreshToken`,
      method: 'POST',
    })
  }
}

export class List {
  /** 获取所有列表 */
  static findAll() {
    return request<Array<ListEntity>>({
      url: `/api/v1/list`,
      method: 'GET',
    })
  }

  /** 创建列表 */
  static create(data?: CreateListDto) {
    return request<ListEntity>({
      url: `/api/v1/list`,
      method: 'POST',
      data,
    })
  }

  /** 更新列表 */
  static update(path: { id: number }, data?: ListDto) {
    return request<void>({
      url: `/api/v1/list/${path.id}`,
      method: 'PATCH',
      data,
    })
  }

  /** 删除列表 */
  static remove(path: { id: number }) {
    return request<void>({
      url: `/api/v1/list/${path.id}`,
      method: 'DELETE',
    })
  }
}
