import User from './components/User'
import clsx from 'clsx'

const UsersSection = () => {
  const users = [
    { name: 'John', score: 23 },
    { name: 'John', score: 3289 },
    { name: 'John', score: 7 },
    { name: 'John', score: 23 },
    { name: 'John', score: 23 },
    { name: 'John', score: 90 },
    { name: 'John', score: 12 },
    { name: 'John', score: 238 },
  ]

  return (
    <section
      id="usersSection"
      className="shadow-[0_0px_60px_5px_rgba(255, 255, 255, 0.3)] flex h-full w-[15rem] flex-col items-center overflow-y-scroll rounded-lg"
    >
      {users.map((user, index) => (
        <User
          key={index}
          name={user.name}
          score={user.score}
          className={clsx({
            'rounded-t-lg': index === 0,
            'rounded-b-lg': index === users.length - 1,
          })}
        />
      ))}
    </section>
  )
}
export default UsersSection
