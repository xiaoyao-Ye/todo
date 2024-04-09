import dayjs from 'dayjs'

export const formatDate = (dateNum?: string | number, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  return dayjs(dateNum).format(format)
}
