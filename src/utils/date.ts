import dayjs from 'dayjs'

export const formatDate = (dateNum?: string | number): string => {
  return dayjs(dateNum).format('YYYY-MM-DD HH:mm:ss')
}
