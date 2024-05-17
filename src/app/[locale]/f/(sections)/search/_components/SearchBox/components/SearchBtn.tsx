'use client'

import { inputValuesAtom } from '../../../atoms'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSetAtom } from 'jotai'
import { useSearch } from '../../../hooks/useSearch'
import { clsxMerge } from '@/utils/clsxMerge'

const SearchBtn = () => {
  const setInputValues = useSetAtom(inputValuesAtom)

  const { isLoading, error } = useSearch()
  console.log('Btn rendered')

  const handleOnClick = () => {
    const usernameInput = document.getElementById(
      'usernameInput',
    ) as HTMLInputElement
    const usernameIDInput = document.getElementById(
      'usernameIDInput',
    ) as HTMLInputElement

    const username = usernameInput.value
    const usernameID = usernameIDInput.value

    setInputValues({
      username: username,
      usernameID: usernameID,
    })
  }

  return (
    <button
      disabled={isLoading}
      onClick={() => handleOnClick()}
      className={clsxMerge(
        'h-10 w-10 drop-shadow-md duration-150 focus:rounded-md focus:p-1 lg:hover:opacity-50',
        {
          'animate-wiggle-more animate-infinite': isLoading,
        },
      )}
    >
      <FontAwesomeIcon
        style={{
          height: '100%',
          width: '100%',
        }}
        className=""
        icon={faSearch}
        color={error ? 'rgba(255,100,100,0.8)' : 'rgba(255,255,255,0.8)'}
      />
    </button>
  )
}

export default SearchBtn
