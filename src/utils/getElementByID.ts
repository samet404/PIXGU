/**
 * Get an element by its ID but with type safety.
 */
export const getElementByID = <T extends HTMLElement>(ID: string): T =>
  document.getElementById(ID) as T
