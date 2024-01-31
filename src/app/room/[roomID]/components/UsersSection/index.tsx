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
    { name: 'John', score: 23 },
    { name: 'John', score: 90 },
    { name: 'John', score: 12 },
    { name: 'John', score: 238 },
    { name: 'John', score: 23 },
    { name: 'John', score: 90 },
    { name: 'John', score: 12 },
    { name: 'John', score: 238 },
    { name: 'John', score: 23 },
    { name: 'John', score: 90 },
    { name: 'John', score: 12 },
    { name: 'John', score: 238 },
    { name: 'John', score: 23 },
    { name: 'John', score: 90 },
    { name: 'John', score: 12 },
    { name: 'John', score: 238 },
    { name: 'John', score: 23 },
    { name: 'John', score: 90 },
    { name: 'John', score: 12 },
    { name: 'John', score: 238 },
    { name: 'John', score: 23 },
    { name: 'John', score: 90 },
    { name: 'John', score: 12 },
    { name: 'John', score: 238 },
    { name: 'John', score: 23 },
    { name: 'John', score: 90 },
    { name: 'John', score: 12 },
    { name: 'John', score: 238 },
    { name: 'John', score: 23 },
    { name: 'John', score: 90 },
    { name: 'John', score: 12 },
    { name: 'John', score: 238 },
    { name: 'John', score: 23 },
    { name: 'John', score: 90 },
    { name: 'John', score: 12 },
    { name: 'John', score: 238 },
    { name: 'John', score: 23 },
    { name: 'John', score: 90 },
    { name: 'John', score: 12 },
    { name: 'John', score: 238 },
    { name: 'John', score: 23 },
    { name: 'John', score: 90 },
    { name: 'John', score: 12 },
    { name: 'John', score: 238 },
  ]

  return (
    <section
      id="usersSection"
      className="h-full overflow-y-scroll pr-2"
    >
      <div className="flex w-[12rem] flex-col shadow-xl">
        {users.map((user, index) => {
          return (
            <User
              key={index}
              name={user.name}
              score={user.score}
              className={clsx({
                'rounded-t-lg': index == 0,
                'rounded-b-lg': index == users.length - 1,
              })}
            />
          )
        })}
      </div>
    </section>
  )
}
export default UsersSection
