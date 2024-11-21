/**
 * Returns a random one character from the given string.
 * @param string - The string from which to select a random character.
 * @returns A random character from the string.
 * 
 * @example
 * randomOneCharacterFromStr('hello') // 'h'
 */
export const randomOneCharacterFromStr = (str: string) => str[Math.floor(Math.random() * str.length)] as string