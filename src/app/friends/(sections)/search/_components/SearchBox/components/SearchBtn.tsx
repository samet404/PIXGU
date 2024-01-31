'use client'

import { inputValuesAtom } from '../../../atoms'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSetAtom } from 'jotai'
import { useSearch } from '../../../hooks/useSearch'

const SearchBtn = () => {
  const setInputValues = useSetAtom(inputValuesAtom)

  useSearch()
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
      onClick={() => handleOnClick()}
      className="h-10 w-10 duration-150 lg:hover:opacity-50"
    >
      <FontAwesomeIcon
        style={{
          height: '100%',
          width: '100%',
        }}
        className="drop-shadow-md"
        icon={faSearch}
        color="rgba(255,255,255,0.8)"
      />
    </button>
  )
}

export default SearchBtn
