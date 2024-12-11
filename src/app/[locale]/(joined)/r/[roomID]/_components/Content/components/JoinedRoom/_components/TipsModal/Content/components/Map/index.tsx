import { Item } from './components/Item'

export const Map = () => {
  return (
    <div className='flex w-full justify-center flex-row h-[1rem]'>
      <Item type={1} />
      <Item type={2} />
      <Item type={3} />
      <Item type={4} />
    </div>
  )
}