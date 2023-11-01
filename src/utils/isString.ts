export const isString = (param: any): param is string => {
  return typeof param === 'string'
}