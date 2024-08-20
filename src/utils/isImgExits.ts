export const isImgExits = (url: string) => {
  const img = new Image()
  img.src = url

  return new Promise<boolean>((resolve) => {
    img.onerror = () => resolve(false)
    img.onload = () => resolve(true)
  })
}
