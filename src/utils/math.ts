export const math = {
  data: {
    i: 0,
  },
  init: function (num = 0) {
    this.data.i = num
    return this
  },
  add: function (num: number) {
    this.data.i += num
    return this
  },
  subtract: function (num: number) {
    this.data.i -= num
    return this
  },
  multiple: function (num: number) {
    this.data.i *= num
    return this
  },
  divide: function (num: number) {
    this.data.i /= num
    return this
  },
  end: function () {
    return this.data.i
  },
}
