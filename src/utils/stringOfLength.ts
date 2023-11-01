type StringOfLength<Min, Max> = string & {
  min: Min
  max: Max
  readonly StringOfLength: unique symbol
}

export const isStringOfLength = <Min extends number, Max extends number>(
  str: string,
  min: Min,
  max: Max,
): str is StringOfLength<Min, Max> => str.length >= min && str.length <= max

/**
    String type with min/max length

    @see: https://stackoverflow.com/a/54832231/22740544 
*/
export const stringOfLength = <Min extends number, Max extends number>(
  input: unknown,
  min: Min,
  max: Max,
): StringOfLength<Min, Max> => {
  if (typeof input !== 'string') {
    throw new Error('invalid input')
  }

  if (!isStringOfLength(input, min, max)) {
    throw new Error('input is not between specified min and max')
  }

  return input // the type of input here is now StringOfLength<Min,Max>
}
