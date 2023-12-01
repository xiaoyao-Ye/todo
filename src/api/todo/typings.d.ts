/* eslint-disable */
// 此文件由 initAPI(https://github.com/xiaoyao-Ye/initapi) 自动生成。请不要手动修改此文件！

export interface TodoEntity {
  createdAt: string

  updatedAt: string

  id: number
  /** 标题 */
  title: string
  /** 备注 */
  description: string
  /** 优先级 */
  priority: number
  /** 今天 */
  today: boolean
  /** 重要 */
  important: boolean
  /** 截止时间 */
  deadline_at: string
  /** 完成时间 */
  completed_at: string
}

export interface Pagination {
  total: number

  page: number

  size: number
}

export interface PageTodoVo {
  list: Array<TodoEntity>

  pagination: Pagination
}

export interface CreateTodoDto {
  /** 今天 */
  today?: boolean
  /** 重要的 */
  important?: boolean
  /** 标题 */
  title: string
}

export interface UpdateTodoDto {
  /** 今天 */
  today?: boolean
  /** 重要的 */
  important?: boolean
  /** 标题 */
  title?: string
  /** 描述 */
  description?: string
  /** 优先级 */
  priority?: number
  /** 是否已完成 */
  completed_at?: string
}

export interface SendCodeDto {
  /** 邮箱 */
  email: string
}

export interface SignUpDto {
  /** 邮箱 */
  email: string
  /** 密码 */
  password: string
  /** 验证码 */
  code: string
}

export interface SignInDto {
  /** 邮箱 */
  email: string
  /** 密码 */
  password: string
}

export interface UserEntity {
  createdAt: string

  updatedAt: string
  /** 昵称 */
  nick_name: string
  /** 邮箱 */
  email: string
  /** 头像 */
  avatar: string
}

export interface SignInVo {
  /** token */
  token: string
  /** 用户信息 */
  user: UserEntity
}

export type SortBy = "today" | "important" | "completed"

export type SortOrder = "ASC" | "DESC"
