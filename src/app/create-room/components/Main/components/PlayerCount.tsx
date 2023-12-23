import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NumberInput from '@/components/NumberInput'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'

const PlayerCount = () => {
  return (
    <div className="flex flex-row items-center justify-between  rounded-md bg-gradient-to-r from-[#ffffff3b] to-[#ffffff2e] p-2 shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)]">
      <div className="flex flex-row items-center gap-2  ">
        <FontAwesomeIcon
          icon={faUserGroup}
          color="rgba(255,255,255,0.7)"
          className="text-[1.5rem]"
        />
        <div className="leading-4 text-[rgba(255,255,255,0.7)]">
          Oyuncu sayısı
        </div>
      </div>
      <NumberInput
        className="w-[4rem] rounded-md border-[0.2rem] border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.2)] p-1 text-[rgba(255,255,255,0.8)] shadow-[0_0px_15px_1px_rgba(255,255,255,0.3)] outline-none"
        type="number"
        min={2}
        startValue={2}
        max={16}
        name=""
        id=""
      />
    </div>
  )
}

export default PlayerCount
