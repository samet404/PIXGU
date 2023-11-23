'use client'

const handleMousemove = (e: MouseEvent) => {
  const customCursor = document.getElementById('custom-cursor')
  customCursor!.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px,0)`
}

const handleBlur = () => {
  const customCursor = document.getElementById('custom-cursor')
  customCursor!.style.opacity = '0'
  console.log('blur')
}

const handleFocus = () => {
  const customCursor = document.getElementById('custom-cursor')
  customCursor!.style.opacity = '1'
  customCursor!.style.backgroundColor
  
}

document.body.addEventListener('mousemove', handleMousemove)
window.addEventListener('blur', handleBlur)
window.addEventListener('focus', handleFocus)

const CustomCursor = () => {
  return (
    <div
      id="custom-cursor"
      className="pointer-events-none absolute z-[100] h-5 w-5 rounded-full bg-[rgba(255,255,255,0.2)] shadow-[0_0px_30px_0px_rgba(0,0,0,0.5)] backdrop-blur-[2px]"
    ></div>
  )
}

export default CustomCursor
