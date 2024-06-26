/* eslint-disable */
// 此文件由 initAPI(https://github.com/xiaoyao-Ye/initapi) 自动生成。请不要手动修改此文件！

export interface TodoEntity {
  created_at: string

  updated_at: string

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

export interface CountList {
  /** 数量 */
  count: number
  /** 日期 */
  date: string
}

export interface CountTodoVo {
  /** 总数量 */
  totalCount: number
  /** 列表 */
  list: Array<CountList>
}

export interface CreateTodoDto {
  /** 今天 */
  today?: boolean
  /** 重要的 */
  important?: boolean
  /** 列表ID */
  list_id?: number
  /** 标题 */
  title: string
}

export interface UpdateTodoDto {
  /** 今天 */
  today?: boolean
  /** 重要的 */
  important?: boolean
  /** 列表ID */
  list_id?: number
  /** 标题 */
  title?: string
  /** 描述 */
  description?: string
  /** 优先级 */
  priority?: number
  /** 完成时间 */
  completed_at?: string
  /** 提醒时间 */
  deadline_at?: string
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
  created_at: string

  updated_at: string
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

export interface TokenVo {
  /** token */
  token: string
}

export interface ListEntity {
  created_at: string

  updated_at: string

  id: number
  /** 列表或分组名称 */
  name: string
  /** 是否分组 */
  isGroup: boolean
  /** 父级id */
  pid: number
  /** 排序 */
  sort: number
}

export interface CreateListDto {
  /** 列表或分组名称 */
  name: string
  /** 是否分组 */
  isGroup?: boolean
  /** 父级id */
  pid?: number
  /** 排序 */
  sort?: number
}

export interface ListDto {
  /** 列表或分组名称 */
  name: string
  /** 是否分组 */
  isGroup?: boolean
  /** 父级id */
  pid?: number
  /** 排序 */
  sort?: number
}

export type SortByTodo = 'created_at' | 'deadline_at' | 'completed_at' | 'priority'

export type SortOrder = 'ASC' | 'DESC'
